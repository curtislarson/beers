import dayjs from "dayjs";
import { trips } from "../../data/nomadlist.json" assert { type: "json" };
import { NOW_DATE } from "./utils/dates";

export interface Trip {
  trip_id: string;
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  length: string;
  latitude: number;
  longitude: number;
  place: string;
  country: string;
}

const TRIP_DATA: Trip[] = trips.map((d) => ({
  trip_id: d.trip_id,
  start: dayjs.unix(d.epoch_start),
  end: dayjs.unix(d.epoch_end),
  length: d.length,
  latitude: d.latitude,
  longitude: d.longitude,
  place: d.place,
  country: d.country,
}));

const pastAndCurrentTripData = TRIP_DATA.filter((t) => t.start.isBefore(NOW_DATE));

/** Returns all trips that have started before the current date. */
export function getTripData() {
  return pastAndCurrentTripData;
}
