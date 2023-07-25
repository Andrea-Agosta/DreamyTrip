import { tequilaClient } from "../utils/apiConnection";
import { ILocationQueryOptions } from "../config/type/tequilaType";
import { updateLocation } from "../repositories/locations.repository";


export const saveLocations = async (queryParams: ILocationQueryOptions, path: string) => {
  const places = await tequilaClient(queryParams, path);
  console.log('place length', places.locations.length);
  try {
    for (const location of places.locations) {
      await updateLocation(location);
    }
    console.log('finished saving locations');
  } catch (error) {
    throw new Error(error);
  }
}
