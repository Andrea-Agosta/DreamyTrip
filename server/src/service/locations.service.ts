import { tequilaClient } from '../utils/apiConnection';
import { ILocationQueryOptions } from '../types/tequilaType';
import { updateLocation } from '../repositories/location.repository';


export const saveLocations = async (queryParams: ILocationQueryOptions, path: string) => {
  const places = await tequilaClient(queryParams, path);
  for (const location of places.locations) {
    await updateLocation(location);
  }
};
