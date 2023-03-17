#!/usr/bin/env -S deno run -A --unstable --no-check --no-config

import type { CheckinData } from "../packages/data/types.ts";
import { $ } from "./deps.ts";

const CHECKIN_DIR = $.path(new URL("../packages/data/checkins.json", import.meta.url));

export async function sortCheckins() {
  const data = await CHECKIN_DIR.readJson<CheckinData[]>();
  const sorted = data.sort((a, b) => new Date(a.created_at) > new Date(b.created_at) ? 1 : -1);
  CHECKIN_DIR.writeJsonPrettySync(sorted);
}

if (import.meta.main) {
  sortCheckins().catch(console.error);
}
