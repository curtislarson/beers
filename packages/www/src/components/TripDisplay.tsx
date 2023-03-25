import { BASIC_DATE_DISPLAY_FORMAT, NOW_DATE, relative } from "../utils/dates";
import { Trip } from "../trip";

export interface TripDisplayProps {
  trip: Trip;
}

export default function TripDisplay({ trip }: TripDisplayProps) {
  const isCurrentTrip = NOW_DATE.isAfter(trip.start) && trip.end.isAfter(NOW_DATE);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row text-xs sm:text-sm">
        <span className="flex-none text-secondary">{trip.place}</span>
        {isCurrentTrip && (
          <span className="ml-1 flex-none">
            - <span className="text-accent">Current Location</span>
          </span>
        )}
      </div>
      <div className="flex flex-row">
        <span className="text-xs text-neutral-500 sm:text-sm">
          {trip.start.format(BASIC_DATE_DISPLAY_FORMAT)} - {trip.end.format(BASIC_DATE_DISPLAY_FORMAT)} ({trip.length})
        </span>
      </div>
    </div>
  );
}
