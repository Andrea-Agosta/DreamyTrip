export interface ILocationQueryOptions {
  locale: string,
  location_types: string,
  limit: number,
  sort: string,
  active_only: boolean,
  search_after: string[]
}

export interface ILocationResponse {
  "id": string,
  "int_id": number,
  "airport_int_id": number,
  "active": boolean,
  "code": string,
  "icao": string,
  "slug_en": string,
  "alternative_names": string[],
  "name": string,
  "slug": string,
  "rank": number,
  "global_rank_dst": number,
  "dst_popularity_score": number,
  "timezone": string,
  "city": {
    "id": string,
    "name": string,
    "code": string,
    "slug": string,
    "subdivision": {
      "id": string,
      "name": string,
      "slug": string,
      "code": string
    } | null,
    "autonomous_territory": string | null,
    "nearby_country": null,
    "country": {
      "id": string,
      "name": string,
      "slug": string,
      "code": string
    },
    "region": {
      "id": string,
      "name": string,
      "slug": string
    },
    "continent": {
      "id": string,
      "name": string,
      "slug": string,
      "code": string
    }
  },
  "location": {
    "lon": number,
    "lat": number
  },
  "alternative_departure_points": [
    {
      "id": string,
      "distance": number,
      "duration": number
    }
  ],
  "type": string
}

export interface ISearchFlightRequest {
  fly_from: string,
  fly_to?: string,
  date_from: string,
  date_to: string,
  return_from?: string,
  return_to?: string,
  nights_in_dst_from?: number,
  nights_in_dst_to?: number,
  max_fly_duration?: number,
  ret_from_diff_city?: boolean,
  ret_to_diff_city?: boolean,
  one_for_city?: number,
  one_per_date?: number,
  adults?: number,
  children?: number,
  infants?: number,
  selected_cabins?: string,
  mix_with_cabins?: string,
  adult_hold_bag?: string,
  adult_hand_bag?: string,
  child_hold_bag?: string,
  child_hand_bag?: string,
  fly_days?: string,
  fly_days_type?: string,
  ret_fly_days?: string,
  ret_fly_days_type?: string,
  only_working_days?: boolean,
  only_weekends?: boolean,
  partner_market?: string,
  curr?: string,
  locale?: string,
  price_from?: number,
  price_to?: number,
  dtime_from?: string,
  dtime_to?: string,
  atime_from?: string,
  atime_to?: string,
  ret_dtime_from?: string,
  ret_dtime_to?: string,
  ret_atime_from?: string,
  ret_atime_to?: string,
  stopover_from?: string,
  stopover_to?: string,
  max_stopovers?: number,
  max_sector_stopovers?: number,
  conn_on_diff_airport?: number,
  ret_from_diff_airport?: number,
  ret_to_diff_airport?: number,
  select_airlines?: string,
  select_airlines_exclude?: boolean,
  select_stop_airport?: string,
  select_stop_airport_exclude?: boolean,
  vehicle_type?: string,
  enable_vi?: boolean,
  sort?: string,
  limit?: number
}
export interface ISearchFlightsResponse {
  "id": string,
  "flyFrom": string,
  "flyTo": string,
  "cityFrom": string,
  "cityCodeFrom": string,
  "cityTo": string,
  "cityCodeTo": string,
  "countryFrom": {
    "code": string,
    "name": string
  },
  "countryTo": {
    "code": string,
    "name": string
  },
  "quality": number,
  "distance": number,
  "duration": {
    "departure": number,
    "return": number,
    "total": number
  },
  "price": number,
  "conversion": {
    "EUR": number
  },
  "bags_price": {
    "1": number,
    "2": number
  },
  "baglimit": {
    "hand_height": number,
    "hand_length": number,
    "hand_weight": number,
    "hand_width": number,
    "hold_dimensions_sum": number,
    "hold_height": number,
    "hold_length": number,
    "hold_weight": number,
    "hold_width": number,
    "personal_item_height": number,
    "personal_item_length": number,
    "personal_item_weight": number,
    "personal_item_width": number
  },
  "availability": {
    "seats": number
  },
  "airlines": string[],
  "route": [
    {
      "id": string,
      "combination_id": string,
      "flyFrom": string,
      "flyTo": string,
      "cityFrom": string,
      "cityCodeFrom": string,
      "cityTo": string,
      "cityCodeTo": string,
      "airline": string,
      "flight_no": number,
      "operating_carrier": string,
      "operating_flight_no": string,
      "fare_basis": string,
      "fare_category": string,
      "fare_classes": string,
      "fare_family": string,
      "return": number,
      "bags_recheck_required": boolean,
      "vi_connection": boolean,
      "guarantee": boolean,
      "vehicle_type": string,
      "local_arrival": string,
      "utc_arrival": string,
      "local_departure": string,
      "utc_departure": string
    }
  ],
  "booking_token": string,
  "deep_link": string,
  "facilitated_booking_available": boolean,
  "pnr_count": number,
  "has_airport_change": boolean,
  "technical_stops": number,
  "throw_away_ticketing": boolean,
  "hidden_city_ticketing": boolean,
  "virtual_interlining": boolean,
  "local_arrival": string,
  "utc_arrival": string,
  "local_departure": string,
  "utc_departure": string
}