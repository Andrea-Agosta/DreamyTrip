import bcrypt from 'bcrypt';
import { getUserByEmail, createUser } from './user.service';
import { IUser } from '../types/user.type';
import { Request } from 'express';
import { BadRequestError } from '../utils/customErrors';

const saltRounds: number = process.env.SALT ? parseInt(process.env.SALT, 10) : 10;
const pathFile = 'src/service/auth.service.ts';

export const signup = async (req: Request, email: string, password: string, done: (error: Error | null, user?: IUser) => void) => {
  const checkIfEmailAlreadyExists = await getUserByEmail(email);
  if (checkIfEmailAlreadyExists) {
    throw new BadRequestError(pathFile, 'signup');
  }
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = await createUser(req.body.name, req.body.surname, req.body.country, email, hashPassword);
  return done(null, user);
};

export const login = async (email: string, password: string, done: (error: Error | null, user?: IUser | boolean, info?: { message: string }) => void) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new BadRequestError(pathFile, 'login');
  }
  const isPasswordValid: boolean = user && bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new BadRequestError(pathFile, 'login');
  }
  return done(null, user, { message: 'Logged in Successfully' });
};