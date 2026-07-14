import { randomUUID } from "node:crypto";
import { onRequest } from "firebase-functions/v2/https";

const OFFERINGS = {
  "ai-software-architect:offering-ai-software-architect-august-2026": {
    programName: "AI Systems Programming Lab",
    offeringName: "AI Systems Programming Lab - August Cohort",
    amount: 36900,
    currency: "USD",
  },
};

function envValue(...keys) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value && value !== "..." && value.toLowerCase() !== "replace_me") return value;
  }
  return "";
}

function squareSettings() {
  const selectedEnvironment = envValue("SQUARE_ENVIRONMENT", "SQUARE_ACTIVE_ENVIRONMENT", "MARKETPLACE_SQUARE_ENVIRONMENT");
  const environment = ["production", "prod", "live"].includes(selectedEnvironment.toLowerCase()) ? "production" : "sandbox";
  const prefix = environment === "production" ? "SQUARE_PRODUCTION" : "SQUARE_SANDBOX";
  const suffix = environment === "production" ? "PROD" : "SANDBOX";

  return {
    environment,
    applicationId: envValue(`${prefix}_APPLICATION_ID`, `SQUARE_APPLICATION_ID_${suffix}`, "SQUARE_APPLICATION_ID"),
    locationId: envValue(`${prefix}_LOCATION_ID`, `SQUARE_LOCATION_ID_${suffix}`, "SQUARE_LOCATION_ID"),
    accessToken: envValue(`${prefix}_ACCESS_TOKEN`, `SQUARE_ACCESS_TOKEN_${suffix}`, "SQUARE_ACCESS_TOKEN"),
    apiVersion: envValue("SQUARE_VERSION") || "2026-06-18",
    paymentsUrl:
      environment === "production"
        ? "https://connect.squareup.com/v2/payments"
        : "https://connect.squareupsandbox.com/v2/payments",
    locationsUrl:
      environment === "production"
        ? "https://connect.squareup.com/v2/locations"
        : "https://connect.squareupsandbox.com/v2/locations",
  };
}

function squareIsReady(settings = squareSettings()) {
  return Boolean(settings.applicationId && settings.locationId && settings.accessToken);
}

function squareCanListLocations(settings = squareSettings()) {
  return Boolean(settings.accessToken);
}

function sendJson(response, status, payload) {
  response.status(status).set("cache-control", "no-store").json(payload);
}

async function squareFetch(url, settings, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${settings.accessToken}`,
      "Square-Version": settings.apiVersion,
      ...(init.headers || {}),
    },
  });
  const payload = await response.json();
  return { response, payload };
}

function routePath(request) {
  return request.path.replace(/^\/api\/marketplace/, "").replace(/^\/api/, "");
}

export const marketplaceApi = onRequest(
  {
    region: "us-central1",
    cors: true,
    secrets: [
      "SQUARE_ACCESS_TOKEN_SANDBOX",
      "SQUARE_ACCESS_TOKEN_PROD",
    ],
  },
  async (request, response) => {
    try {
      const pathname = routePath(request);

      if (request.method === "GET" && pathname === "/square/config") {
        const settings = squareSettings();
        sendJson(response, 200, {
          enabled: squareIsReady(settings),
          canListLocations: squareCanListLocations(settings),
          environment: settings.environment,
          applicationId: settings.applicationId || null,
          locationId: settings.locationId || null,
        });
        return;
      }

      if (request.method === "GET" && pathname === "/square/locations") {
        const settings = squareSettings();
        if (!squareCanListLocations(settings)) {
          sendJson(response, 503, { error: "Square access token is not configured." });
          return;
        }
        const { response: squareResponse, payload } = await squareFetch(settings.locationsUrl, settings, {
          method: "GET",
        });
        sendJson(response, squareResponse.ok ? 200 : squareResponse.status, payload);
        return;
      }

      if (request.method === "POST" && pathname === "/square/payments") {
        const settings = squareSettings();
        if (!squareIsReady(settings)) {
          sendJson(response, 503, { error: "Square is not configured." });
          return;
        }

        const { sourceId, programHandle, offeringId } = request.body || {};
        const offering = OFFERINGS[`${programHandle}:${offeringId}`];
        if (!offering || !sourceId) {
          sendJson(response, 400, { error: "Missing program, offering, or Square source token." });
          return;
        }

        const { response: squareResponse, payload } = await squareFetch(settings.paymentsUrl, settings, {
          method: "POST",
          body: JSON.stringify({
            idempotency_key: randomUUID(),
            source_id: sourceId,
            location_id: settings.locationId,
            amount_money: {
              amount: offering.amount,
              currency: offering.currency,
            },
            note: `${offering.programName} - ${offering.offeringName}`,
            reference_id: `${programHandle}:${offeringId}`,
          }),
        });
        sendJson(response, squareResponse.ok ? 200 : squareResponse.status, payload);
        return;
      }

      sendJson(response, 404, { error: "Marketplace API route not found." });
    } catch (error) {
      sendJson(response, 500, { error: error.message });
    }
  },
);
