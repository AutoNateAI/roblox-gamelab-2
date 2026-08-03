import { randomUUID } from "node:crypto";
import { initializeApp, getApps } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";

const firebaseApp = getApps().length ? getApps()[0] : initializeApp();

const OFFERINGS = {
  "ai-agent-systems:offering-ai-agent-systems-august-2026": {
    programName: "How to Create Software Systems with AI Agents",
    offeringName: "How to Create Software Systems with AI Agents - August Cohort",
    amount: 49900,
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

const BOOKING_WINDOW_START_MINUTES = 8 * 60;
const BOOKING_WINDOW_END_MINUTES = 18 * 60;
const BOOKING_TIME_ZONE = "America/Chicago";

// Converts a wall-clock date/time in `timeZone` into the real UTC instant it represents,
// correctly accounting for DST, without a timezone library: render an initial UTC guess back
// through the target zone, measure the drift from the intended wall time, and correct for it.
function wallTimeToUtcMs(timeZone, y, mo, d, h, mi) {
  const guessMs = Date.UTC(y, mo - 1, d, h, mi);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date(guessMs));
  const get = (type) => Number(parts.find((part) => part.type === type)?.value);
  const renderedAsUtcMs = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"));
  return guessMs + (guessMs - renderedAsUtcMs);
}

// The booking form submits naive "YYYY-MM-DDTHH:mm" strings labeled as Central time.
function parseFormSubmittedCentralMs(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(String(value || ""));
  if (!match) return null;
  const [y, mo, d, h, mi] = match.slice(1).map(Number);
  return wallTimeToUtcMs(BOOKING_TIME_ZONE, y, mo, d, h, mi);
}

// Records read back from Airtable's dateTime fields are real ISO 8601 UTC instants (it does its
// own correct, DST-aware conversion from the America/Chicago field config on write).
function parseAirtableUtcMs(value) {
  const ms = Date.parse(value || "");
  return Number.isNaN(ms) ? null : ms;
}

function timeOfDayMinutes(value) {
  const match = /T(\d{2}):(\d{2})/.exec(String(value || ""));
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function bookingFitsBusinessHours(value, durationMinutes) {
  const start = timeOfDayMinutes(value);
  if (start === null) return false;
  return start >= BOOKING_WINDOW_START_MINUTES && start + durationMinutes <= BOOKING_WINDOW_END_MINUTES;
}

function intervalsOverlap(startAMs, durationAMinutes, startBMs, durationBMinutes) {
  const endAMs = startAMs + durationAMinutes * 60000;
  const endBMs = startBMs + durationBMinutes * 60000;
  return startAMs < endBMs && startBMs < endAMs;
}

async function findConflictingBooking({ apiKey, baseId, preferredDateTime, durationMinutes }) {
  const proposedStartMs = parseFormSubmittedCentralMs(preferredDateTime);
  const formula = encodeURIComponent("AND({Status}!='Cancelled',{Status}!='No-Show')");
  const listResponse = await fetch(`https://api.airtable.com/v0/${baseId}/Bookings?filterByFormula=${formula}&pageSize=100`, {
    headers: { authorization: `Bearer ${apiKey}` },
  });
  if (!listResponse.ok) {
    throw new Error("Could not check the schedule for conflicts.");
  }
  const { records = [] } = await listResponse.json();
  return records.find((record) => {
    const effectiveTime = record.fields["Confirmed Date & Time"] || record.fields["Preferred Date & Time"];
    const existingStartMs = parseAirtableUtcMs(effectiveTime);
    const existingDuration = Number(record.fields["Duration (minutes)"]) || 0;
    if (existingStartMs === null) return false;
    return intervalsOverlap(proposedStartMs, durationMinutes, existingStartMs, existingDuration);
  });
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

function cleanString(value) {
  return String(value || "").trim();
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

        const { sourceId, programHandle, offeringId, buyer = {} } = request.body || {};
        const offering = OFFERINGS[`${programHandle}:${offeringId}`];
        if (!offering || !sourceId) {
          sendJson(response, 400, { error: "Missing program, offering, or Square source token." });
          return;
        }
        const buyerName = String(buyer.cardholderName || buyer.buyerName || "").trim();
        const buyerEmail = String(buyer.buyerEmail || "").trim();
        const noteParts = [
          `${offering.programName} - ${offering.offeringName}`,
          buyerName ? `Cardholder: ${buyerName}` : "",
        ].filter(Boolean);

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
            buyer_email_address: buyerEmail || undefined,
            note: noteParts.join(" | "),
            reference_id: `${programHandle}:${offeringId}`,
          }),
        });
        sendJson(response, squareResponse.ok ? 200 : squareResponse.status, payload);
        return;
      }

      if (request.method === "POST" && pathname === "/consulting/booking") {
        const apiKey = envValue("AIRTABLE_API_KEY");
        const baseId = envValue("AIRTABLE_BASE_ID_CONSULTING");
        if (!apiKey || !baseId) {
          sendJson(response, 503, { error: "Booking is not configured." });
          return;
        }

        const body = request.body || {};
        const name = cleanString(body.name);
        const email = cleanString(body.email);
        const callType = body.callType === "Follow-up" ? "Follow-up" : body.callType === "Discovery" ? "Discovery" : "";
        const duration = cleanString(body.duration);
        const preferredDateTime = cleanString(body.preferredDateTime);
        const validDurations = callType === "Discovery" ? ["15", "30"] : ["30", "45", "60", "90", "120"];

        if (!name || !email || !callType || !validDurations.includes(duration) || !preferredDateTime) {
          sendJson(response, 400, {
            error: `Missing or invalid booking details. ${callType || "Each"} calls must be one of: ${validDurations.join(", ")} minutes.`,
          });
          return;
        }

        const durationMinutes = Number(duration);
        const alternateDateTime = cleanString(body.alternateDateTime);
        const preferredMs = parseFormSubmittedCentralMs(preferredDateTime);
        if (preferredMs === null || preferredMs < Date.now()) {
          sendJson(response, 400, { error: "Preferred time must be a valid date and time in the future." });
          return;
        }
        if (!bookingFitsBusinessHours(preferredDateTime, durationMinutes)) {
          sendJson(response, 400, { error: "Preferred time must start and end between 8:00 AM and 6:00 PM Central." });
          return;
        }
        if (alternateDateTime && !bookingFitsBusinessHours(alternateDateTime, durationMinutes)) {
          sendJson(response, 400, { error: "Alternate time must start and end between 8:00 AM and 6:00 PM Central." });
          return;
        }

        try {
          const conflict = await findConflictingBooking({ apiKey, baseId, preferredDateTime, durationMinutes });
          if (conflict) {
            sendJson(response, 409, { error: "That time is already booked. Please choose a different time." });
            return;
          }
        } catch (error) {
          sendJson(response, 502, { error: error.message });
          return;
        }

        const fields = {
          "Full Name": name,
          "Email": email,
          "Organization": cleanString(body.organization) || undefined,
          "Call Type": callType,
          "Duration (minutes)": duration,
          "Preferred Date & Time": preferredDateTime,
          "Alternate Date & Time": alternateDateTime || undefined,
          "Their Timezone": body.timezone || undefined,
          "What do you want out of this call?": cleanString(body.goals) || undefined,
          "Project / Organization Context": cleanString(body.context) || undefined,
          "How did you hear about us?": body.howHeard || undefined,
          "Status": "Requested",
        };

        const airtableResponse = await fetch(`https://api.airtable.com/v0/${baseId}/Bookings`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ fields, typecast: true }),
        });
        const payload = await airtableResponse.json();
        if (!airtableResponse.ok) {
          sendJson(response, airtableResponse.status, { error: payload.error?.message || "Booking failed." });
          return;
        }
        sendJson(response, 200, { ok: true });
        return;
      }

      if (request.method === "POST" && pathname === "/enrollments") {
        const {
          studentName,
          studentEmail,
          buyerEmail,
          paymentId,
          programHandle,
          offeringId,
        } = request.body || {};
        const cleanedStudentName = cleanString(studentName);
        const cleanedStudentEmail = cleanString(studentEmail).toLowerCase();
        if (!cleanedStudentName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanedStudentEmail)) {
          sendJson(response, 400, { error: "Student name and valid student email are required." });
          return;
        }

        const document = {
          namespace: "autonateai-youth-programming",
          source: "marketplace-checkout-success",
          studentName: cleanedStudentName,
          studentEmail: cleanedStudentEmail,
          buyerEmail: cleanString(buyerEmail).toLowerCase(),
          paymentId: cleanString(paymentId),
          programHandle: cleanString(programHandle),
          offeringId: cleanString(offeringId),
          createdAt: FieldValue.serverTimestamp(),
        };
        const docRef = await getFirestore(firebaseApp).collection("marketplace_enrollments").add(document);
        sendJson(response, 200, { ok: true, enrollmentId: docRef.id });
        return;
      }

      sendJson(response, 404, { error: "Marketplace API route not found." });
    } catch (error) {
      sendJson(response, 500, { error: error.message });
    }
  },
);
