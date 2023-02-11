#!/usr/bin/env -S deno run -A --unstable --no-check --no-config

import { CheckinData } from "../packages/data/types.ts";
import { createBeerServerDb } from "./helpers/db.ts";
import { normalizeExportData } from "./helpers/normalize-data.ts";
import { ExportData } from "./helpers/types.ts";

const CHECKINS_DATA_FILE = new URL("../packages/data/checkins.json", import.meta.url).pathname;
const EXPORT_DATA_FILE = new URL("../packages/data/export.json", import.meta.url);
const EXPORT_DATA = JSON.parse(Deno.readTextFileSync(EXPORT_DATA_FILE)) as ExportData[];

const BEER_IMAGE_PLACEHOLDER = "https://assets.untappd.com/site/assets/images/temp/badge-beer-default.png";

/** This assumes the beer label url database has all the images loaded */
async function genCheckinsFromExport() {
  const db = createBeerServerDb(Deno.env.get("BEER_SERVER_DATABASE_URL")!);

  const beerIdToImageUrlMap = (
    await db.selectFrom("beer_label_image").select(["beer_id", "image_url", "untappd_image_url"]).execute()
  ).reduce<Map<number, string>>((acc, curr) => {
    acc.set(curr.beer_id, curr.image_url ?? curr.untappd_image_url);
    return acc;
  }, new Map());

  const normalized: CheckinData[] = EXPORT_DATA.map((exp) => {
    const norm = normalizeExportData(exp);
    return Object.assign(normalizeExportData(exp), {
      beer_label: beerIdToImageUrlMap.get(norm.beer_id) ?? BEER_IMAGE_PLACEHOLDER,
    });
  });

  Deno.writeTextFileSync(CHECKINS_DATA_FILE, JSON.stringify(normalized), { append: false });
}

genCheckinsFromExport().catch(console.error);
