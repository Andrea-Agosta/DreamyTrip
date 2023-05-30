import { Request } from 'express';
import { IUser } from "../config/type/userTypes";
import { getUsers as getUsersRepository } from "../repositories/user.repository";
import { getUserById as getUserByIdRepository } from "../repositories/user.repository";
import { getUserByEmail as getUserByEmailRepository } from "../repositories/user.repository";
import { createUser as createUserRepository } from "../repositories/user.repository";
import { updateUser as updateUserRepository } from "../repositories/user.repository";
import { deleteUser as deleteUserrRepository } from "../repositories/user.repository";

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const getUsers = async (): Promise<IUser[]> => {
  return await getUsersRepository();
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await getUserByIdRepository(id);
}

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await getUserByEmailRepository(email);
}

export const createUser = async (name: string, surname: string, country: string, email: string, password: string): Promise<IUser> => {
  return await createUserRepository(name, surname, country, email, password);
}

export const updateUser = async (req: Request<{ id: string }, {}, IUser>) => {
  const updatesData: Partial<IUser> = {};
  req.body.name && (updatesData.name = req.body.name);
  req.body.surname && (updatesData.surname = req.body.surname);
  req.body.country && (updatesData.country = req.body.country);
  req.body.email && emailRegex.test(req.body.email) && (updatesData.email = req.body.email);
  req.body.password && (updatesData.password = req.body.password);
  return await updateUserRepository(req.params.id, updatesData);
}

export const deleteUser = async (id: string): Promise<string> => {
  return await deleteUserrRepository(id);
};