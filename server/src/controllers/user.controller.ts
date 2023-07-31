import { Request } from 'express';
import { IUser } from '../config/type/userTypes';
import { getUsers as getUsersService } from '../service/user.service';
import { getUserById as getUserByIdService } from '../service/user.service';
import { updateUser as updateUserService } from '../service/user.service';
import { deleteUser as deleteUserService } from '../service/user.service';
import { BadRequestError } from '../utils/customErrors';

const pathFile = 'src/controllers/user.controller.ts';

export const getUsers = async (): Promise<IUser[]> => {
  return await getUsersService();
};

export const getUserById = async (id: string | undefined): Promise<IUser | null> => {
  if (id) {
    return await getUserByIdService(id);
  }
  throw new BadRequestError(pathFile, 'getUserById');
}

export const updateUser = async (req: Request<{ id: string }, {}, IUser>): Promise<IUser> => {
  if (req.params.id) {
    return updateUserService(req);
  }
  throw new BadRequestError(pathFile, 'updateUser');
};

export const deleteUser = async (id: string | undefined): Promise<void> => {
  if (!id) {
    throw new BadRequestError(pathFile, 'deleteUser');
  }
  await deleteUserService(id);
};