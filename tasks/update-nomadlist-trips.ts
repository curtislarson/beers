#!/usr/bin/env -S deno run -A --unstable --no-check --no-config

import { NomadListUserResponse } from "../packages/data/types.ts";

const TRIPS_DOWNLOAD_URL = "https://nomadlist.com/@curtis.json";
const TRIPS_DATA_FILE = new URL("../packages/data/nomadlist.json", import.meta.url);

export async function fetchNomadListTrips(): Promise<NomadListUserResponse> {
  // nomadlist.com doesn't auth for this I guess
  return await fetch(TRIPS_DOWNLOAD_URL).then((r) => r.json());
}

async function updateNomadListTrips() {
  const data = await fetchNomadListTrips();
  // We don't want false positive updates since `cached` field may often change.
  delete data["cached"];
  return Deno.writeTextFileSync(TRIPS_DATA_FILE, JSON.stringify(data, null, 2));
}

updateNomadListTrips().catch(console.error);
