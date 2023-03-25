export interface VenueAddressProps {
  venue_city?: string | null;
  venue_state?: string | null;
  venue_country?: string | null;
}

export default function VenueAddress({ venue_city, venue_country, venue_state }: VenueAddressProps) {
  const country = venue_country ? <label className="overflow-x-hidden">{venue_country}</label> : null;
  if (venue_city && venue_state) {
    const cityState = (
      <label className="tooltip overflow-x-hidden whitespace-nowrap" data-tip={`${venue_city}, ${venue_state}`}>
        {venue_city}, {venue_state}
      </label>
    );
    if (venue_country) {
      return (
        <span className="float-right flex flex-col">
          {cityState}
          {country}
        </span>
      );
    } else {
      return <span className="float-right overflow-x-hidden">{cityState}</span>;
    }
  } else if (venue_country) {
    return country;
  } else {
    // Just assume if we don't have venue information then it was an "Untappd at Home" checkin
    return (
      <span className="float-right flex flex-col overflow-x-hidden text-right">
        <label>Untappd at Home</label>
        <label>The World</label>
      </span>
    );
  }
}
