#!/usr/bin/env -S deno run -A --unstable --no-check --no-config

import "https://deno.land/std@0.173.0/dotenv/load.ts";
import { $ } from "https://deno.land/x/dax@0.28.0/mod.ts";
import { RawTrip } from "../packages/data/types.ts";

const TRIPS_DOWNLOAD_URL = "https://nomadlist.com/@curtis.json";

export async function fetchNomadListTrips(): Promise<RawTrip[]> {
  // nomadlist.com doesn't auth for this I guess
  return await fetch(TRIPS_DOWNLOAD_URL).then((r) => r.json());
}
