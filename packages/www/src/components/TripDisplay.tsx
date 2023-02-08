import { BASIC_DATE_DISPLAY_FORMAT, relative } from "../dates";
import { Trip } from "../trip";

export interface TripDisplayProps {
  trip: Trip;
}

export default function TripDisplay({ trip }: TripDisplayProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <span className="text-secondary flex-none">{trip.place}</span>
        <span className="text-accent flex-none ml-1">{relative(trip.start)}</span>
      </div>
      <div className="flex flex-row">
        <span className="text-neutral-500 text-sm">
          {trip.start.format(BASIC_DATE_DISPLAY_FORMAT)} - {trip.end.format(BASIC_DATE_DISPLAY_FORMAT)} ({trip.length})
        </span>
      </div>
    </div>
  );
}
