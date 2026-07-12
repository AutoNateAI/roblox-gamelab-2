const API_ROOT = "https://api.airtable.com/v0";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createAirtableClient({
  apiKey = requireEnv("AIRTABLE_API_KEY"),
  baseId = requireEnv("AIRTABLE_BASE_ID_GAMELAB"),
} = {}) {
  async function request(path, { method = "GET", body } = {}) {
    const response = await fetch(`${API_ROOT}/${baseId}/${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Airtable ${method} ${path} failed (${response.status}): ${text}`);
    }

    return response.json();
  }

  async function listAll(tableName, { filterByFormula } = {}) {
    const records = [];
    let offset;

    do {
      const params = new URLSearchParams();
      if (filterByFormula) params.set("filterByFormula", filterByFormula);
      if (offset) params.set("offset", offset);
      const query = params.toString();
      const page = await request(`${encodeURIComponent(tableName)}${query ? `?${query}` : ""}`);
      records.push(...page.records);
      offset = page.offset;
    } while (offset);

    return records;
  }

  async function getRecord(tableName, recordId) {
    return request(`${encodeURIComponent(tableName)}/${recordId}`);
  }

  async function createRecords(tableName, records) {
    return request(encodeURIComponent(tableName), {
      method: "POST",
      body: { records, typecast: true },
    });
  }

  async function updateRecords(tableName, records) {
    return request(encodeURIComponent(tableName), {
      method: "PATCH",
      body: { records, typecast: true },
    });
  }

  return { listAll, getRecord, createRecords, updateRecords };
}
