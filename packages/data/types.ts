export interface CheckinData {
  checkin_id: number;
  checkin_comment: string;
  rating_score: number | string;
  // Not available via API
  // global_rating_score: number;
  created_at: string;
  beer_id: number;
  beer_name: string;
  beer_label: string;
  beer_style: string;
  beer_abv: number | string;
  brewery_id: number | string;
  brewery_name: string;
  brewery_label?: string;
  brewery_country: string;
  brewery_city?: string;
  brewery_state?: string;
  venue_name?: string | null;
  venue_lat: number;
  venue_lng: number;
  venue_city?: string | null;
  venue_state?: string | null;
  venue_country?: string | null;
  venue_img?: string;
}

export type CheckinDataWithoutBeerLabel = Omit<CheckinData, "beer_label">;

export interface NomadListUserResponse {
  /** Must be removed if we want to detect if this response has actually changed */
  cached?: string;
  success: string;
  legal: string;
  photo: string;
  username: string;
  location: Location;
  stats: Stats;
  map: string;
  trips: RawTrip[];
  frequent_visits: { [key: string]: number };
  longest_stays: { [key: string]: number };
}

export interface Location {
  now: Next;
  next: Next;
  previous: Next;
}

export interface Next {
  city: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  epoch_start: number;
  epoch_end: number;
  date_start: string;
  date_end: string;
  place_photo?: string;
}

export interface Stats {
  cities: number;
  countries: number;
  followers: number;
  following: number;
  distance_traveled_km: number;
  distance_traveled_miles: number;
  countries_visited_percentage: number;
  cities_visited_percentage: number;
}

export interface RawTrip {
  epoch_start: number;
  epoch_end: number;
  date_start: string;
  date_end: string;
  length: string;
  epoch_duration: number;
  place: string;
  place_slug: null | string;
  place_long_slug: null | string;
  place_url: null | string;
  place_photo: string;
  country: string;
  country_code: string;
  country_slug: string;
  latitude: number;
  longitude: number;
  trip_id: string;
}
