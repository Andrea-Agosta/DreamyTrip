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