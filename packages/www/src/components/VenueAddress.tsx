export interface VenueAddressProps {
  venue_city?: string | null;
  venue_state?: string | null;
  venue_country?: string | null;
}

export default function VenueAddress({ venue_city, venue_country, venue_state }: VenueAddressProps) {
  if (venue_city && venue_state) {
    const cityState = (
      <label>
        {venue_city}, {venue_state}
      </label>
    );
    if (venue_country) {
      return (
        <span className="float-right flex flex-col">
          {cityState}
          <label>{venue_country}</label>
        </span>
      );
    } else {
      return <span className="float-right">{cityState}</span>;
    }
  } else if (venue_country) {
    return (
      <span className="float-right">
        <label>{venue_country}</label>
      </span>
    );
  } else {
    // Just assume if we don't have venue information then it was an "Untappd at Home" checkin
    return (
      <span className="float-right flex flex-col text-right">
        <label>Untappd at Home</label>
        <label>The World</label>
      </span>
    );
  }
}
