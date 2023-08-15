import { Request } from 'express';
import { ILocationResponse } from '../types/tequila.type';
import { dbClose, dbConnect } from '../utils/dbConnection';
import { Location } from '../models/locationModel';

export const getLocations = async (req: Request) => {
  try {
    let selectFields = '';
    await dbConnect();
    if(req.query.select) {
      selectFields = req.query.select.toString();
    }
    const locations = await Location.find({}).select(selectFields.trim());
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