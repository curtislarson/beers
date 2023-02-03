#!/usr/bin/env -S deno run -A --unstable --no-check --no-config

import { S3Client, PutObjectCommand } from "https://deno.land/x/aws_sdk@v3.32.0-1/client-s3/mod.ts";
import { load } from "https://deno.land/std@0.173.0/dotenv/mod.ts";
import { createPolicy } from "./helpers/policy.ts";
import { createBeerServerDb } from "./helpers/db.ts";
import { $ } from "https://deno.land/x/dax@0.24.1/mod.ts";
import { extname } from "https://deno.land/std@0.171.0/path/mod.ts";

await load({ envPath: new URL("../.env.local", import.meta.url).pathname, export: true });

const BASE_URL = "https://f2bf6f14a43e5de19292583c4d8978c4.r2.cloudflarestorage.com";
const BUCKET = "daotw-beer-images";

export async function uploadImagesToR2() {
  const { BEER_SERVER_DATABASE_URL, CLOUDFLARE_R2_ACCESS_KEY_ID, CLOUDFLARE_R2_SECRET_ACCESS_KEY } =
    Deno.env.toObject();
  const db = createBeerServerDb(BEER_SERVER_DATABASE_URL);
  const client = new S3Client({
    credentials: { accessKeyId: CLOUDFLARE_R2_ACCESS_KEY_ID, secretAccessKey: CLOUDFLARE_R2_SECRET_ACCESS_KEY },
    endpoint: BASE_URL,
  });
  const retry = createPolicy();

  const beerImageLabels = await db
    .selectFrom("beer_label_image")
    .select(["untappd_image_url", "beer_id"])
    .where("image_url", "is", null)
    .execute();

  async function uploadImagePipeline(imageLabel: { untappd_image_url: string; beer_id: number }) {
    const ext = extname(imageLabel.untappd_image_url);
    const key = `${crypto.randomUUID()}-${imageLabel.beer_id}${ext}`;
    const fullUrl = new URL(`/${BUCKET}/${key}`, BASE_URL);

    $.logStep("URL", fullUrl);

    const { blob, contentLength } = await fetch(imageLabel.untappd_image_url).then(async (r) => {
      if (!r.ok || r.body == null) {
        throw new Error(`Could not get image data for beer ${imageLabel.beer_id}`);
      }
      return { blob: await r.blob(), contentLength: r.headers.get("content-length") };
    });

    $.logStep("Streaming response");

    await client.send(
      new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: blob, ContentLength: Number(contentLength) })
    );

    $.logStep("Uploaded to Bucket");
    await db
      .updateTable("beer_label_image")
      .set({
        image_url: fullUrl.href,
      })
      .where("beer_id", "=", imageLabel.beer_id)
      .execute();

    $.logStep("Inserted into Database");
  }

  for (const imageLabel of beerImageLabels) {
    await retry.execute(() => uploadImagePipeline(imageLabel).catch((e) => console.error(e)));
  }
}

uploadImagesToR2().catch(console.error);
