import { useCallback, useState } from "react";
import { Trip } from "../trip";
import TripDisplay from "./TripDisplay";
import SearchInput from "./SearchInput";

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
  const [autoNavigate, toggleAutoNavigate] = useState(false);

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
      <div className="flex flex-row gap-2">
        <div className="flex-1">
          <SearchInput debounceMs={searchDebounceMs} onChange={onSearchUpdated} />
        </div>
        <div className="flex-1">
          <div className="dropdown dropdown-left w-full">
            <button
              tabIndex={0}
              className="text-md btn w-full bg-base-300 normal-case"
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
                className="dropdown-content menu !z-[401] w-72 rounded-md border-2 border-secondary bg-base-300 p-2 shadow"
              >
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
      </div>
      <div className="flex flex-row">
        <div className="flex-1">
          <button
            className="text-md btn w-full bg-base-300 normal-case"
            onClick={() => toggleAutoNavigate(!autoNavigate)}
          >
            {autoNavigate ? "Navigating..." : "Start Auto Navigate"}
          </button>
        </div>
      </div>
    </div>
  );
}
