import { Generated, getDb } from "https://x.curtis.land/db/pg.ts";

export type Checkin = {
  id: Generated<number>;
  checkin_id: number;
  checkin_comment: string;
  rating_score: string;
  created_at: string;
  beer_id: number;
  beer_name: string;
  beer_label: string;
  beer_style: string;
  beer_abv: string;
  brewery_id: string;
  brewery_name: string;
  brewery_label: string;
  brewery_country: string;
  venue_name: string;
  venue_lat: number;
  venue_lng: number;
  venue_city: string;
  venue_state: string;
  venue_img: string;
};

/**
 * Model BeerLabelImage
 */
export type BeerLabelImage = {
  id: Generated<number>;
  beer_id: number;
  untappd_image_url: string;
  image_url?: string;
};

interface Database {
  checkin: Checkin;
  beer_label_image: BeerLabelImage;
}

export function createBeerServerDb(connectionString: string) {
  return getDb<Database>({ connectionString });
}
