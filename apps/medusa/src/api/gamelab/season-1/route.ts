import { readFile } from "node:fs/promises";
import path from "node:path";
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function GET(_req: MedusaRequest, res: MedusaResponse) {
  const filePath = path.resolve(process.cwd(), "../../data/season-1/quests.json");
  const season = JSON.parse(await readFile(filePath, "utf8"));
  res.json(season);
}
