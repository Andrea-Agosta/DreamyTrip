import { User } from "../models/userModel";
import { IUser } from "../config/type/userTypes";

export const getUsers = async (): Promise<IUser[]> => {
  return User.find({});
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id).exec();
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email: email }).exec();
};

export const createUser = async (name: string, surname: string, country: string, email: string, password: string): Promise<IUser> => {
  const user = new User({ name, surname, country, email, password });
  await user.save();
  return user;
};

export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser> => {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      throw new Error('BadRequestError')
    }
    return user;
  } catch (error) {
    throw new Error('BadRequestError')
  }
}

export const deleteUser = async (id: string): Promise<string> => {
  await User.findByIdAndRemove(id);
  return 'user deleted'
};