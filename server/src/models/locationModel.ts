import mongoose, { Schema } from 'mongoose';
import { ILocationResponse } from '../types/tequilaType';

const locationSchema = new Schema({
  'id': String,
  'int_id': Number,
  'airport_int_id': Number,
  'active': Boolean,
  'code': String,
  'name': String,
  'slug': String,
  'alternative_names': [String],
  'rank': Number,
  'timezone': String,
  'city': {
    'id': String,
    'name': String,
    'code': String,
    'slug': String,
    'subdivision': {
      'id': String,
      'name': String,
      'slug': String,
      'code': String,
    },
    'country': {
      'id': String,
      'name': String,
      'slug': String,
      'code': String,
    },
  },
});

export const Location = mongoose.model<ILocationResponse>('Location', locationSchema);

module.exports = { Location };