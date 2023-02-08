import dayjs from "dayjs";
import { useMemo } from "react";
import Checkins from "../../data/checkins.json";
import { CheckinData } from "../../data/types";
import { FilterData } from "./components/FeedFilters";
import { CHECKIN_DATE_ORIGINAL_FORMAT } from "./dates";
import { StatMap } from "./stat-map";

export interface CheckinFilter {
  from?: Date;
  to?: Date;
}

export type StatName =
  | "Total Checkins"
  | "Unique Beers"
  | "Unique Breweries"
  | "Unique Locations"
  | "Unique Countries"
  | "Favorite Style"
  | "Favorite Venue";

type Predicate = (checkin: CheckinData) => boolean;

export function useCheckinState(filter?: Partial<FilterData>) {
  const checkins = useMemo(() => {
    let returnCheckins: CheckinData[] = [...Checkins];

    if (filter) {
      const predicates: Predicate[] = [];
      if (filter.trip != null) {
        const trip = filter.trip;
        predicates.push((checkin) =>
          dayjs(checkin.created_at).isAfter(trip.start) && dayjs(checkin.created_at).isBefore(trip.end)
        );
      }

      if (predicates.length > 0) {
        returnCheckins = returnCheckins.filter((checkin) => predicates.some((pred) => pred(checkin)));
      }
    }
    return returnCheckins.sort((a, b) =>
      dayjs(a.created_at, CHECKIN_DATE_ORIGINAL_FORMAT).isAfter(dayjs(b.created_at, CHECKIN_DATE_ORIGINAL_FORMAT))
        ? -1
        : 1
    );
  }, [filter]);

  const stats = useMemo(() => {
    const statMap = new StatMap<StatName>();
    checkins.forEach((c) => {
      statMap.inc("Total Checkins");
      statMap.uniq("Unique Beers", c.beer_name);
      statMap.uniq("Unique Breweries", c.brewery_name);
      if (c.venue_country) {
        statMap.uniq("Unique Countries", c.venue_country);
      }
      if (c.venue_lat && c.venue_lng) {
        statMap.uniq("Unique Locations", `${c.venue_lat},${c.venue_lng}`);
      }
      statMap.fave("Favorite Style", c.beer_style);
      if (c.venue_name) {
        statMap.fave("Favorite Venue", c.venue_name);
      }
    });
    return statMap;
  }, [checkins]);

  return {
    checkins,
    numCheckins: checkins.length,
    stats,
  };
}
