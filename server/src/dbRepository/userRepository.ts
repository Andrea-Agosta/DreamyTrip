import { User } from "../models/user";
import { IUser } from "../config/type/user";
import { dbConnect, dbClose } from "../utils/dbConnection";

export const getUsers = async (): Promise<IUser[]> => {
  await dbConnect();
  const usersList = await User.find({});
  await dbClose();
  return usersList;
};

export const getUserByID = async (id: string): Promise<IUser | string> => {
  await dbConnect();
  const user = await User.findById(id).exec();
  await dbClose();
  return user ? user : 'No user found';
};

export const getUserByEmail = async (email: string): Promise<IUser | string> => {
  await dbConnect();
  const user = await User.findOne({ email: email }).exec();
  await dbClose();
  return user ? user : 'No user found';
};

// export const createUser = async (email: string, password: string, role: string): Promise<string> => {
//   const query: string = `INSERT INTO UserData (email, password, role) VALUES ('${email}','${password}','${role}')`;
//   await connect(query);
//   return await 'user registrated;'
// };

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