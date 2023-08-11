import { ILocationQueryOptions, ISearchFlightRequest } from '../../types/tequila.type';
import { location } from '../utils/test-location-data';


export const tequilaClient = async (_queryParams: ILocationQueryOptions | ISearchFlightRequest, _path: string) => {
  return [{ data: location }];
};
