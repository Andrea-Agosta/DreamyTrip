import { Request } from 'express';
import { IUser } from '../config/type/userTypes';
import { getUsers as getUsersService } from '../service/userService';
import { getUserById as getUserByIdService } from '../service/userService';
import { updateUser as updateUserService } from '../service/userService';
import { deleteUser as deleteUserService } from '../service/userService';

export const getUsers = async (): Promise<IUser[]> => {
  return await getUsersService();
};

export const getUserById = async (id: string | undefined): Promise<IUser | null> => {
  if (id) {
    return await getUserByIdService(id);
  }
  throw new Error(`An unknown error occurred`);
}

export const updateUser = async (req: Request<{ id: string }, {}, IUser>): Promise<IUser> => {
  if (req.params.id) {
    return updateUserService(req);
  }
  throw new Error('BadRequestError');
};

export const deleteUser = async (id: string | undefined): Promise<string> => {
  if (!id) {
    throw new Error('BadRequestError');
  }
  return await deleteUserService(id);
};