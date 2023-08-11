import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/user.type';

const userSchema: Schema = new Schema({
  name: String,
  surname: String,
  country: String,
  email: String,
  password: String,
});

export const User = mongoose.model<IUser>('User', userSchema);
