import { ILocationResponse } from "../config/type/tequilaType";
import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema({
  "id": String,
  "int_id": String,
  "airport_int_id": String,
  "active": Boolean,
  "code": String,
  "name": String,
  "slug": String,
  "alternative_names": [String],
  "rank": String,
  "timezone": String,
  "city": {
    "id": String,
    "name": String,
    "code": String,
    "slug": String,
    "subdivision": {
      "id": String,
      "name": String,
      "slug": String,
      "code": String
    },
    "country": {
      "id": String,
      "name": String,
      "slug": String,
      "code": String
    }
  }
});

export const Location = mongoose.model<ILocationResponse>("Location", locationSchema);

module.exports = { Location };