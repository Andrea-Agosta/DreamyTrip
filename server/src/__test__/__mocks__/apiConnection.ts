import { ILocationQueryOptions, ISearchFlightRequest } from '../../config/type/tequilaType';
import { location } from '../utils/test-location-data';


export const tequilaClient = async (_queryParams: ILocationQueryOptions | ISearchFlightRequest, _path: string) => {
  return [{ data: location }];
};
