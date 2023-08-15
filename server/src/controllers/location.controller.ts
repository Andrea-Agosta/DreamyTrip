import { Request } from 'express';
import { ILocationResponse } from '../types/tequila.type';
import {getLocations  as getLocationsService} from '../service/locations.service';


export const getLocations = async (req: Request): Promise<ILocationResponse[]> => {
  return await getLocationsService(req);
};