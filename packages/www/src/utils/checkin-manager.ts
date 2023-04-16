import dayjs from "dayjs";
import { LatLng, latLngBounds } from "leaflet";
import { useMemo, useState } from "react";
import { default as _CD } from "../../../data/checkins.json";
import { CheckinData } from "../../../data/types";
import { Trip } from "../trip";
import { CHECKIN_DATE_ORIGINAL_FORMAT } from "./dates";
import { StatTracker } from "./stat-tracker";

export interface CheckinFilter {
  from?: Date;
  to?: Date;
}

export interface FilterData {
  trip: Trip;
  searchFilter: string;
}

export type StatName =
  | "Total Checkins"
  | "Unique Beers"
  | "Unique Breweries"
  | "Unique Locations"
  | "Unique Countries"
  | "Favorite Style"
  | "Favorite Venue";

type KeysWithStringVals<Base> = NonNullable<
  {
    [Key in keyof Base]: Base[Key] extends string | null | undefined ? Key : never;
  }[keyof Base]
>;

const FILTERABLE_PROPERTY_NAMES: KeysWithStringVals<CheckinData>[] = [
  "beer_name",
  "brewery_name",
  "venue_name",
  "beer_style",
];

type Predicate = (checkin: CheckinData) => boolean;

const sortFn = (a: CheckinData, b: CheckinData) =>
  dayjs(a.created_at, CHECKIN_DATE_ORIGINAL_FORMAT).isAfter(dayjs(b.created_at, CHECKIN_DATE_ORIGINAL_FORMAT)) ? -1 : 1;

const AT_HOME_CHECKIN_VENUE_NAME = "Untappd at Home";

/** Used to filter out "problematic" checkins that dont view well on the website, such as 'Untappd at Home' checkins */
function filterCheckinFn(checkin: CheckinData) {
  return checkin.venue_name !== AT_HOME_CHECKIN_VENUE_NAME;
}

const Checkins = (_CD as CheckinData[]).slice().filter(filterCheckinFn);

export function useCheckinManager() {
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [searchFilter, setSearchFilter] = useState("");

  const checkins = useMemo(() => {
    const predicates: Predicate[] = [];

    if (activeTrip) {
      predicates.push(
        (checkin) =>
          dayjs(checkin.created_at).isAfter(activeTrip.start) && dayjs(checkin.created_at).isBefore(activeTrip.end),
      );
    }
    if (searchFilter) {
      const search = searchFilter.toLowerCase();
      predicates.push((checkin) =>
        FILTERABLE_PROPERTY_NAMES.some((prop) => checkin[prop]?.toLowerCase().includes(search))
      );
    }
    if (predicates.length > 0) {
      return Checkins.slice()
        .filter((checkin) => predicates.some((pred) => pred(checkin)))
        .sort(sortFn);
    }
    return Checkins.slice().sort(sortFn);
  }, [activeTrip, searchFilter]);

  const { stats, bounds } = useMemo(() => {
    const tracker = new StatTracker<StatName>();
    const latLngs: LatLng[] = [];
    checkins.forEach((c) => {
      tracker.inc("Total Checkins");
      tracker.uniq("Unique Beers", c.beer_name);
      tracker.uniq("Unique Breweries", c.brewery_name);
      if (c.venue_country) {
        tracker.uniq("Unique Countries", c.venue_country);
      }
      if (c.venue_lat && c.venue_lng) {
        tracker.uniq("Unique Locations", `${c.venue_lat},${c.venue_lng}`);
      }
      tracker.fave("Favorite Style", c.beer_style);
      if (c.venue_name) {
        tracker.fave("Favorite Venue", c.venue_name);
      }

      latLngs.push(new LatLng(c.venue_lat, c.venue_lng));
    });
    return { stats: tracker, bounds: latLngBounds(latLngs) };
  }, [checkins]);

  const firstCheckin = checkins.at(0);

  return {
    firstCheckin,
    checkins,
    bounds,
    filtered: checkins.length !== Checkins.length,
    suggestedLatLng: activeTrip != null
      ? new LatLng(activeTrip.latitude, activeTrip.longitude)
      : firstCheckin != null
      ? new LatLng(firstCheckin.venue_lat, firstCheckin.venue_lng)
      : null,
    stats,
    setActiveTrip,
    setSearchFilter,
  };
}
