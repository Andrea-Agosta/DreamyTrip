import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../controller/userController';
import express, { Request, Response } from 'express';
import { IBodyUser, IUser } from '../config/type/user';
const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const users: IUser[] = await getAllUsers();
    res.status(200).json(users);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    res.status(500).send('An unknown error occurred');
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user: IUser[] = await getUserById(Number(req.params.id));
    res.status(200).json(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    res.status(500).send('An unknown error occurred');
  }
});

router.patch('/:id', async (req: Request<{ id: number }, {}, IBodyUser>, res: Response) => {
  try {
    const user: string = await updateUserById(req);
    res.status(200).send(user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    res.status(500).send('An unknown error occurred');
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const response = await deleteUserById(Number(req.params.id));
    res.status(204).json(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).send(err.message);
    }
    res.status(500).send('An unknown error occurred');
  }
})

export default router;