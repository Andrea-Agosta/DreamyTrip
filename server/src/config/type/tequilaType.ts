export interface ILocationQueryOptions {
  locale: string,
  location_types: string,
  limit: number,
  sort: string,
  active_only: boolean,
  search_after: string[]
}