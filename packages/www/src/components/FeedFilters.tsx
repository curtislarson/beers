import { Fragment, useCallback, useEffect, useState } from "react";
import { Trip } from "../trip";
import { relative } from "../dates";
import TripDisplay from "./TripDisplay";

export interface FilterData {
  trip: Trip;
}

export interface FeedFiltersProps {
  trips: Trip[];
  onFilterUpdated: (data: Partial<FilterData>) => void;
}

export default function FeedFilters({ trips, onFilterUpdated }: FeedFiltersProps) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [tripDropdownVisible, setTripDropdownVisible] = useState(false);

  const updateTrip = useCallback(
    (trip: null | Trip) => {
      setTripDropdownVisible(false);
      setTrip(trip);
    },
    [setTripDropdownVisible, setTrip]
  );

  useEffect(() => {
    const filterData: Partial<FilterData> = {};
    if (trip != null) {
      filterData.trip = trip;
    }
    onFilterUpdated(filterData);
  }, [trip, onFilterUpdated]);

  return (
    <div>
      <div className="dropdown">
        <label tabIndex={0} className="btn" onClick={() => setTripDropdownVisible(true)}>
          {trip ? (
            <Fragment>
              <span className="text-secondary">{trip.place}</span>
              <span className="mx-2">-</span>
              <span className="text-accent">{relative(trip.start)}</span>
            </Fragment>
          ) : (
            "Select a Trip"
          )}
        </label>
        {tripDropdownVisible && (
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-72 z-50">
            <div className="max-h-72 overflow-y-scroll">
              <li className="border-b-2 border-base-100" onClick={() => updateTrip(null)}>
                <span className="text-secondary">All Trips</span>
              </li>
              {trips.map((t) => (
                <li key={t.trip_id} className="border-b-2 border-base-100" onClick={() => updateTrip(t)}>
                  <a className="flex flex-row">
                    <TripDisplay trip={t} />
                  </a>
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
