import bcrypt from 'bcrypt';
import { getUserByEmail, createUser } from './user.service';
import { IUser } from '../config/type/userTypes';
import { Request } from 'express';

const saltRounds: number = process.env.SALT ? parseInt(process.env.SALT, 10) : 10;

export const signup = async (req: Request, email: string, password: string, done: (error: Error | null, user?: IUser) => void) => {
  const checkIfEmailAlreadyExists = await getUserByEmail(email);
  if (checkIfEmailAlreadyExists) {
    throw new Error('An unknown error occurred');
  }
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = await createUser(req.body.name, req.body.surname, req.body.country, email, hashPassword);
  return done(null, user);
};

export const login = async (email: string, password: string, done: (error: Error | null, user?: IUser | boolean, info?: { message: string }) => void) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return done(null, false, { message: 'NotFoundError' });
  }
  const isPasswordValid: boolean = user && bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return done(null, false, { message: 'BadRequestError' });
  }
  return done(null, user, { message: 'Logged in Successfully' });
}