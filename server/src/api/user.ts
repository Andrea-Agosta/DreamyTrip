import { deleteUser, getUsers, getUserById, updateUser } from '../controller/user.controller';
import express, { Request, Response } from 'express';
import { IUser } from '../config/type/userTypes';
import { tryCatch } from '../utils/tryCatch';

const router = express.Router();

router.get('/', tryCatch(async (_req: Request, res: Response) => {
  const users: IUser[] = await getUsers();
  return res.json(users);
}));

router.get('/:id', tryCatch(async (req: Request, res: Response) => {
  const user: IUser | null = await getUserById(req.params.id);
  return res.status(200).json(user);
}));

router.patch('/:id', tryCatch(async (req: Request<{ id: string }, {}, IUser>, res: Response) => {
  const user = await updateUser(req);
  res.status(200).json(user);
}));

router.delete('/:id', tryCatch(async (req: Request, res: Response) => {
  const response = await deleteUser(req.params.id);
  res.status(204).send(response);
}));

export default router;