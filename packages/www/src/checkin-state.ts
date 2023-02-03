import dayjs from "dayjs";
import { useMemo, useState } from "react";
import Checkins from "../../data/checkins.json";
import { CheckinData } from "../../data/types";
import { CHECKIN_DATE_FORMAT } from "./date-format";
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

export function useCheckinState() {
  const stats = useMemo(() => new StatMap<StatName>(), []);
  const originalCheckins: CheckinData[] = Checkins;

  const [filter, setFilter] = useState<CheckinFilter>({});

  const checkins = useMemo(() => {
    return originalCheckins.sort((a, b) =>
      dayjs(a.created_at, CHECKIN_DATE_FORMAT).isAfter(dayjs(b.created_at, CHECKIN_DATE_FORMAT)) ? -1 : 1
    );
  }, [originalCheckins]);

  return {
    checkins,
    numCheckins: checkins.length,
    setFilter,
    stats,
  };
}
