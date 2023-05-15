import { deleteUser, getUserByID, getUsers, updateUser } from '../dbRepository/userRepository';
import { Request } from 'express';
import { IUser } from '../config/type/user';

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const getAllUsers = async (): Promise<IUser[]> => {
  return await getUsers();
};

export const getUserById = async (id: string | undefined): Promise<IUser | string> => {
  if (id) {
    return await getUserByID(id);
  }
  throw new Error(`User ${id} does not exist`);
}

export const updateUserById = async (req: Request<{ id: string }, {}, IUser>): Promise<IUser> => {
  if (req.params.id) {
    const updatesData: Partial<IUser> = {};
    req.body.name && (updatesData.name = req.body.name);
    req.body.surname && (updatesData.surname = req.body.surname);
    req.body.country && (updatesData.country = req.body.country);
    req.body.email && emailRegex.test(req.body.email) && (updatesData.email = req.body.email);
    req.body.password && (updatesData.password = req.body.password);
    return await updateUser(req.params.id, updatesData);
  }
  throw new Error('BadRequestError');
};

export const deleteUserById = async (id: string | undefined): Promise<string> => {
  if (!id) {
    throw new Error('BadRequestError');
  }
  return await deleteUser(id);
};