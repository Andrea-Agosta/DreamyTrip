import { Request } from 'express';
import { tequilaClient } from '../utils/apiConnection';
import { ILocationQueryOptions, ILocationResponse } from '../types/tequila.type';
import { updateLocation } from '../repositories/location.repository';
import { getLocations as geolocationRepository } from '../repositories/location.repository';


export const getLocations = async (req: Request): Promise<ILocationResponse[]> => {
  return await geolocationRepository(req);
};

export const saveLocations = async (queryParams: ILocationQueryOptions, path: string) => {
  const places = await tequilaClient(queryParams, path);
  for (const location of places.locations) {
    await updateLocation(location);
  }
};
