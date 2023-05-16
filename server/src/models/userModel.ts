import { IUser } from "../config/type/userTypes";
import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
  name: String,
  surname: String,
  country: String,
  email: String,
  password: String,
});

export const User = mongoose.model<IUser>("User", userSchema);
