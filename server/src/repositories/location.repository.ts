import { ILocationResponse } from '../types/tequilaType';
import { dbClose, dbConnect } from '../utils/dbConnection';
import { Location } from '../models/locationModel';

export const getLocations = async () => {
  try {
    await dbConnect();
    const locations = await Location.find({});
    await dbClose();
    return locations;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateLocation = async (location: ILocationResponse) => {
  try {
    await dbConnect();
    await Location.findOneAndUpdate({ 'airport_int_id': location.airport_int_id }, location, {
      new: true,
      upsert: true,
    });
    await dbClose();
  } catch (error) {
    throw new Error(error);
  }
};