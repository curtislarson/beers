#!/usr/bin/env -S deno run -A --unstable --no-check --no-config

import "https://deno.land/std@0.173.0/dotenv/load.ts";
import { $ } from "https://deno.land/x/dax@0.28.0/mod.ts";
import { CheckinData } from "../packages/data/types.ts";
import { normalizeCheckinsData } from "./helpers/normalize-data.ts";
import { Untappd } from "./helpers/untappd.ts";

const CHECKINS_DATA_FILE = new URL("../packages/data/checkins.json", import.meta.url).pathname;
const EXISTING_CHECKINS_DATA = JSON.parse(Deno.readTextFileSync(CHECKINS_DATA_FILE)) as CheckinData[];
const EXISTING_CHECKINS_MAP = EXISTING_CHECKINS_DATA.reduce<Map<number, CheckinData>>((acc, curr) => {
  acc.set(curr.checkin_id, curr);
  return acc;
}, new Map());

function writeOutputIfCi(newCheckinCount: number) {
  if (Deno.env.get("CI")) {
    const GITHUB_OUTPUT = Deno.env.get("GITHUB_OUTPUT")!;
    Deno.writeTextFileSync(GITHUB_OUTPUT, `NEW_CHECKIN_COUNT=${newCheckinCount}`, { append: true });
  }
}

async function fetchRecentCheckins() {
  const untappd = new Untappd();
  $.logStep("Initialized client");

  const checkinCountStart = EXISTING_CHECKINS_DATA.length;
  $.logStep("" + checkinCountStart, "Existing Checkins");
  const res = await untappd.getUserBeers({ username: "quackware" });
  $.logStep("Response count: ", res.checkins.count);
  const normalized = normalizeCheckinsData(res.checkins);
  normalized.forEach((n) => {
    if (!EXISTING_CHECKINS_MAP.has(n.checkin_id)) {
      EXISTING_CHECKINS_DATA.push(n);
      EXISTING_CHECKINS_MAP.set(n.checkin_id, n);
    }
  });
  const checkinCountEnd = EXISTING_CHECKINS_DATA.length;
  const newCheckinCount = checkinCountEnd - checkinCountStart;
  $.logStep("" + checkinCountEnd, "Final Checkins");
  $.logStep("" + newCheckinCount, "New Checkins");

  if (newCheckinCount === 0) {
    $.logStep("Skipping write", "due to no new checkins");
  } else {
    Deno.writeTextFileSync(CHECKINS_DATA_FILE, JSON.stringify(EXISTING_CHECKINS_DATA), { append: false });
  }

  writeOutputIfCi(newCheckinCount);
}

fetchRecentCheckins().catch(console.error);
