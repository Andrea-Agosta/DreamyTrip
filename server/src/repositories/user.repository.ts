import { User } from '../models/userModel';
import { IUser } from '../types/user.type';
import { dbClose, dbConnect } from '../utils/dbConnection';
import { BadRequestError } from '../utils/customErrors';

const path = 'src/repositories/user.repository.ts';

export const getUsers = async (): Promise<IUser[]> => {
  await dbConnect();
  const users = await User.find({});
  await dbClose();
  return users;
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    await dbConnect();
    const user = await User.findById(id).exec();
    await dbClose();
    return user;
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      throw new BadRequestError(path, 'getUserById');
    }
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  await dbConnect();
  const user = await User.findOne({ email: email }).exec();
  await dbClose();
  return user;
};

export const createUser = async (name: string, surname: string, country: string, email: string, password: string): Promise<IUser> => {
  await dbConnect();
  const user = new User({ name, surname, country, email, password });
  await user.save();
  await dbClose();
  return user;
};

export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser> => {
  try {
    await dbConnect();
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    await dbClose();
    if (!user) {
      throw new BadRequestError(path, 'getUserById');
    }
    return user;
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      throw new BadRequestError(path, 'getUserById');
    }
    throw new Error(error.message);
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await dbConnect();
    await User.findByIdAndRemove(id);
    await dbClose();
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      throw new BadRequestError(path, 'getUserById');
    }
    throw new Error(error.message);
  }
};