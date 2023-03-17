#!/usr/bin/env -S deno run -A --unstable --no-check --no-config

import { $ } from "./deps.ts";
import { createBeerServerDb } from "./helpers/db.ts";
import { ExportData } from "./helpers/types.ts";
import { scrapeBeerLabelUrl } from "./scrape-beer-label-url.ts";

const db = createBeerServerDb(Deno.env.get("BEER_SERVER_DATABASE_URL")!);

export async function fetchImageUrls() {
  const existingBeerIds = new Set(
    (await db.selectFrom("beer_label_image").select(["beer_id"]).execute()).map((val) => val.beer_id),
  );

  const exportData = JSON.parse(
    Deno.readTextFileSync(new URL("../packages/data/export.json", import.meta.url)),
  ) as ExportData[];

  let insertCount = 0;
  for (const exp of exportData) {
    const bid = Number(exp.bid);
    if (existingBeerIds.has(bid)) {
      continue;
    }
    const imageUrl = await scrapeBeerLabelUrl(bid);
    if (imageUrl === null) {
      $.logError("Unable to scrape", exp.bid);
      continue;
    }
    $.logStep("Scraped", imageUrl);

    await db
      .insertInto("beer_label_image")
      .values({
        beer_id: bid,
        untappd_image_url: imageUrl,
      })
      .onConflict((oc) => oc.column("beer_id").doNothing())
      .execute();

    $.logStep("Inserted into DB");

    existingBeerIds.add(bid);

    insertCount++;
  }

  $.logStep(`Inserted ${insertCount} records`);
}

fetchImageUrls().catch(console.error);
