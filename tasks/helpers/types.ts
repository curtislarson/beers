export interface Meta {
  code: number;
  response_time: Time;
  init_time: Time;
}

export interface Time {
  time: number;
  measure: string;
}

export interface UserActivityFeedResponse {
  meta: Meta;
  notifications: any[];
  response: UserActivityFeed;
}

export interface UserActivityFeed {
  pagination: { since_url: string; next_url: string; max_id: number };
  checkins: Checkins;
}

export interface Checkins {
  count: number;
  items: Items[];
}

export interface Items {
  checkin_id: number;
  created_at: string;
  checkin_comment: string;
  rating_score: number;
  user: User;
  beer: Beer;
  brewery: Brewery;
  venue: Venue;
  comments: Comments;
  toasts: Comments;
  media: Badges;
  source: Source;
  badges: Badges;
}

export interface Badges {
  count: number;
  items: BadgesItem[];
}

export interface BadgesItem {
  badge_id: number;
  user_badge_id: number;
  badge_name: string;
  badge_description: string;
  created_at: string;
  badge_image: VenueIcon;
}

export interface VenueIcon {
  sm: string;
  md: string;
  lg: string;
}

export interface Beer {
  bid: number;
  beer_name: string;
  beer_label: string;
  beer_style: string;
  beer_abv: number;
  auth_rating: number;
  wish_list: boolean;
  beer_active: number;
}

export interface Brewery {
  brewery_id: number;
  brewery_name: string;
  brewery_slug: string;
  brewery_label: string;
  country_name: string;
  contact: BreweryContact;
  location: BreweryLocation;
  brewery_active: number;
}

export interface BreweryContact {
  twitter: string;
  facebook: string;
  instagram: string;
  url: string;
}

export interface BreweryLocation {
  brewery_city: string;
  brewery_state: string;
  lat: number;
  lng: number;
}

export interface Comments {
  total_count: number;
  count: number;
  items: any[];
  auth_toast?: boolean;
}

export interface Source {
  app_name: string;
  app_website: string;
}

export interface User {
  uid: number;
  user_name: string;
  first_name: string;
  last_name: string;
  location: string;
  is_supporter: number;
  url: string;
  bio: string;
  relationship: string;
  user_avatar: string;
  is_private: number;
  contact: UserContact;
}

export interface UserContact {
  foursquare: number;
  twitter: string;
  facebook: number;
}

export interface Venue {
  venue_id: number;
  venue_name: string;
  primary_category: string;
  parent_category_id: string;
  categories: Categories;
  location?: VenueLocation;
  contact: VenueContact;
  public_venue: boolean;
  foursquare: Foursquare;
  venue_icon?: VenueIcon;
}

export interface Categories {
  count: number;
  items: CategoriesItem[];
}

export interface CategoriesItem {
  category_name: string;
  category_id: string;
  is_primary: boolean;
}

export interface VenueContact {
  twitter: string;
  venue_url: string;
}

export interface Foursquare {
  foursquare_id: string;
  foursquare_url: string;
}

export interface VenueLocation {
  venue_address: string;
  venue_city: string;
  venue_state: string;
  venue_country: string;
  lat: number;
  lng: number;
}

export interface ExportData {
  beer_name: string;
  brewery_name: string;
  beer_type: string;
  beer_abv: string;
  beer_ibu: string;
  comment: string;
  venue_name: string;
  venue_city: string;
  venue_state: string;
  venue_country: string;
  venue_lat?: string;
  venue_lng?: string;
  rating_score: string;
  created_at: string;
  checkin_url: string;
  beer_url: string;
  brewery_url: string;
  brewery_country: string;
  brewery_city: string;
  brewery_state: string;
  flavor_profiles: string;
  purchase_venue: string;
  serving_type: string;
  checkin_id: string;
  bid: string;
  brewery_id: string;
  photo_url: string | null;
  global_rating_score: number;
  global_weighted_rating_score: number;
  tagged_friends: string;
  total_toasts: string;
  total_comments: string;
}
