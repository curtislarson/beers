import dayjs from "dayjs";
import { useMemo } from "react";
import Checkins from "../../data/checkins.json";
import { CheckinData } from "../../data/types";
import { FilterData } from "./components/FeedFilters";
import { CHECKIN_DATE_FORMAT } from "./dates";
import { StatMap } from "./stat-map";

export interface CheckinFilter {
  from?: Date;
  to?: Date;
}

export type StatName =
  | "Total Checkins"
  | "Total Filtered"
  | "Unique Beers"
  | "Unique Breweries"
  | "Unique Locations"
  | "Unique Countries";

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
      dayjs(a.created_at, CHECKIN_DATE_FORMAT).isAfter(dayjs(b.created_at, CHECKIN_DATE_FORMAT)) ? -1 : 1
    );
  }, [filter]);

  const stats = useMemo(() => new StatMap<StatName>(), []);

  return {
    checkins,
    numCheckins: checkins.length,
    stats,
  };
}
