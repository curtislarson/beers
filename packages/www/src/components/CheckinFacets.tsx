import { useCallback, useState } from "react";
import { Trip } from "../trip";
import TripDisplay from "./TripDisplay";
import SearchInput from "./SearchInput";
import AutoNavigate from "./AutoNavigate";

export interface CheckinFacetsProps {
  trips: Trip[];
  /** @default 300 */
  searchDebounceMs?: number;
  onTripUpdated: (trip: Trip | null) => void;
  onSearchUpdated: (val: string) => void;
}

export default function CheckinFacets({ trips, onTripUpdated, onSearchUpdated, searchDebounceMs }: CheckinFacetsProps) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [tripDropdownVisible, setTripDropdownVisible] = useState(false);

  const updateTrip = useCallback(
    (trip: null | Trip) => {
      setTripDropdownVisible(false);
      setTrip(trip);
      onTripUpdated(trip);
    },
    [setTripDropdownVisible, onTripUpdated, setTrip]
  );

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="mt-2 flex flex-row gap-2 sm:mt-0">
        <div className="flex-1">
          <SearchInput debounceMs={searchDebounceMs} onChange={onSearchUpdated} />
        </div>
        <div className="flex-1">
          <div className="dropdown-bottom dropdown w-full sm:dropdown-left">
            <button
              tabIndex={0}
              className="btn-xs btn w-full bg-base-300 normal-case sm:btn-md"
              onClick={() => setTripDropdownVisible(!tripDropdownVisible)}
            >
              {trip ? (
                <div className="w-max">
                  <TripDisplay trip={trip} />
                </div>
              ) : (
                <span className="text-secondary">Filter By Location</span>
              )}
            </button>
            {tripDropdownVisible && (
              <ul
                tabIndex={0}
                className="dropdown-content menu right-10 !z-[401] w-52 rounded-md border-2 border-secondary bg-base-300 shadow sm:right-0 sm:w-72 sm:p-2"
              >
                <div className="max-h-72 overflow-y-scroll">
                  <li className="border-b-2 border-base-100" onClick={() => updateTrip(null)}>
                    <span className="sm:text-md text-sm text-secondary">All Trips</span>
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
      </div>
      <div className="flex flex-row">
        <div className="flex-1">
          <AutoNavigate />
        </div>
      </div>
    </div>
  );
}
