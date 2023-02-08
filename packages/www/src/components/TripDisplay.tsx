import { Fragment } from "react";
import { relative } from "../dates";
import { Trip } from "../trip";

export interface TripDisplayProps {
  trip: Trip;
}

export default function TripDisplay({ trip }: TripDisplayProps) {
  return (
    <Fragment>
      <span className="text-secondary flex-none">{trip.place}</span>
      <span className="flex-none -mx-1">-</span>
      <span className="text-accent  flex-none">{relative(trip.start)}</span>
    </Fragment>
  );
}
