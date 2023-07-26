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