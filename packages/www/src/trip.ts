import dayjs from "dayjs";
import RawTripData from "../../data/trips.json" assert { type: "json" };

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

const TRIP_DATA: Trip[] = RawTripData.map((d) => ({
  trip_id: d.trip_id,
  start: dayjs.unix(d.epoch_start),
  end: dayjs.unix(d.epoch_end),
  length: d.length,
  latitude: d.latitude,
  longitude: d.longitude,
  place: d.place,
  country: d.country,
}));

export function getTripData() {
  return TRIP_DATA;
}
