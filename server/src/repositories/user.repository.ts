import { User } from "../models/userModel";
import { IUser } from "../config/type/userTypes";
import { dbConnect, dbClose } from "../utils/dbConnection";

export const getUsers = async (): Promise<IUser[]> => {
  await dbConnect();
  const usersList = await User.find({});
  await dbClose();
  return usersList;
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  await dbConnect();
  const user = await User.findById(id).exec();
  await dbClose();
  return user;
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  await dbConnect();
  const user = await User.findOne({ email: email }).exec();
  await dbClose();
  return user;
};

export const createUser = async (name: string, surname: string, country: string, email: string, password: string): Promise<IUser> => {
  // await dbConnect();
  const user = new User({ name, surname, country, email, password });
  await user.save();
  // await dbClose();
  return user;
};

export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser> => {
  await dbConnect();
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  await dbClose();
  if (!user) {
    throw new Error('BadRequestError')
  }
  return user;
}

export const deleteUser = async (id: string): Promise<string> => {
  await dbConnect();
  await User.findByIdAndRemove(id);
  await dbClose();
  return 'user deleted;'
};