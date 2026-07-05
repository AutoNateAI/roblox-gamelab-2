import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(_req: MedusaRequest, res: MedusaResponse) {
  res.json({
    ok: true,
    service: "autonateai-gamelab-medusa",
    namespace: "/gamelab",
    timestamp: new Date().toISOString(),
  });
}
