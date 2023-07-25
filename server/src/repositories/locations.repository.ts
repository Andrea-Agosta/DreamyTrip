import { ILocationResponse } from "../config/type/tequilaType";
import { dbClose, dbConnect } from "../utils/dbConnection";
import { Location } from "../models/locationModel";


export const updateLocation = async (location: ILocationResponse) => {
  await dbConnect();
  await Location.findOneAndUpdate({ "airport_int_id": location.airport_int_id }, location, {
    new: true,
    upsert: true
  });
  await dbClose();
};