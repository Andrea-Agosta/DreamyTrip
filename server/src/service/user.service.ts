import { Request } from 'express';
import { IUser } from "../config/type/userTypes";
import { getUsers as getUsersRepository } from "../repositories/user.repository";
import { getUserById as getUserByIdRepository } from "../repositories/user.repository";
import { getUserByEmail as getUserByEmailRepository } from "../repositories/user.repository";
import { createUser as createUserRepository } from "../repositories/user.repository";
import { updateUser as updateUserRepository } from "../repositories/user.repository";
import { deleteUser as deleteUserrRepository } from "../repositories/user.repository";
import { dbClose, dbConnect } from '../utils/dbConnection';

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const getUsers = async (): Promise<IUser[]> => {
  await dbConnect();
  const dbResponse = await getUsersRepository();
  await dbClose();
  return dbResponse;
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  await dbConnect();
  const dbResponse = await getUserByIdRepository(id);
  await dbClose();
  return dbResponse;
}

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  await dbConnect();
  const dbResponse = await getUserByEmailRepository(email);
  await dbClose();
  return dbResponse;
}

export const createUser = async (name: string, surname: string, country: string, email: string, password: string): Promise<IUser> => {
  await dbConnect();
  const dbResponse = await createUserRepository(name, surname, country, email, password);
  await dbClose();
  return dbResponse;
}

export const updateUser = async (req: Request<{ id: string }, {}, IUser>) => {
  const updatesData: Partial<IUser> = {};
  req.body.name && (updatesData.name = req.body.name);
  req.body.surname && (updatesData.surname = req.body.surname);
  req.body.country && (updatesData.country = req.body.country);
  req.body.email && emailRegex.test(req.body.email) && (updatesData.email = req.body.email);
  req.body.password && (updatesData.password = req.body.password);
  await dbConnect();
  const dbResponse = await updateUserRepository(req.params.id, updatesData);
  await dbClose();
  return dbResponse;
}

export const deleteUser = async (id: string): Promise<string> => {
  await dbConnect();
  const dbResponse = await deleteUserrRepository(id);
  await dbClose();
  return dbResponse;
};