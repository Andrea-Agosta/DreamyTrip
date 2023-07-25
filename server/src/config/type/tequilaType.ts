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
  "int_id": string,
  "active": boolean,
  "code": string,
  "name": string,
  "slug": string,
  "rank": string,
  "timezone": string,
  "city": {
    "id": string,
    "name": string,
    "code": string,
    "slug": string,
    "subdivision": string,
    "autonomous_territory": string,
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
    "lon": string,
    "lat": string
  },
  "alternative_departure_points": string[],
  "type": string
}