import { CheckinData, CheckinDataWithoutBeerLabel } from "../../packages/data/types.ts";
import { Checkins, ExportData } from "./types.ts";

/** Converts data from an untappd export to data we use in app */
export function normalizeExportData({
  checkin_id,
  rating_score,
  comment,
  created_at,
  bid,
  beer_name,
  beer_type,
  beer_abv,
  brewery_id,
  brewery_name,
  brewery_country,
  brewery_city,
  brewery_state,
  venue_name,
  venue_city,
  venue_country,
  venue_state,
  venue_lat,
  venue_lng,
}: ExportData): CheckinDataWithoutBeerLabel {
  return {
    checkin_id: Number(checkin_id),
    rating_score,
    checkin_comment: comment,
    created_at,
    beer_id: Number(bid),
    beer_name,
    beer_style: beer_type,
    beer_abv,
    brewery_id,
    brewery_name,
    brewery_city,
    brewery_state,
    brewery_country,
    venue_name,
    venue_city,
    venue_state,
    venue_country,
    venue_lat: Number(venue_lat ?? 0),
    venue_lng: Number(venue_lng ?? 0),
  };
}

/** Converts data from untappd api recent beers to data we use in app */
export function normalizeCheckinsData(checkins: Checkins): CheckinData[] {
  return checkins.items.map(({ rating_score, created_at, checkin_id, beer, brewery, checkin_comment, venue }) => ({
    checkin_id,
    checkin_comment,
    rating_score,
    created_at,
    beer_id: beer.bid,
    beer_name: beer.beer_name,
    beer_label: beer.beer_label,
    beer_style: beer.beer_style,
    beer_abv: beer.beer_abv,
    brewery_id: brewery.brewery_id,
    brewery_name: brewery.brewery_name,
    brewery_label: brewery.brewery_label,
    brewery_country: brewery.country_name,
    brewery_city: brewery.location.brewery_city,
    brewery_state: brewery.location.brewery_state,
    venue_name: venue.venue_name,
    venue_city: venue.location?.venue_city,
    venue_country: venue.location?.venue_country,
    venue_state: venue.location?.venue_state,
    venue_lat: Number(venue.location?.lat ?? 0),
    venue_lng: Number(venue.location?.lng ?? 0),
    venue_img: venue.venue_icon?.lg,
  }));
}
