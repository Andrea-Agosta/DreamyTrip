import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../controller/userController';
import express, { Request, Response } from 'express';
import { IUser } from '../config/type/user';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const users: IUser[] = await getAllUsers();
  return res.json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const user: IUser[] = await getUserById(Number(req.params.id));
  return res.status(200).json(user);
});

router.patch('/:id', async (req: Request<{ id: number }, {}, IUser>, res: Response) => {
  const user: string = await updateUserById(req);
  res.status(200).send(user);
})

router.delete('/:id', async (req: Request, res: Response) => {
  const response = await deleteUserById(Number(req.params.id));
  res.status(204).json(response);
})

export default router;