import express, { Request, Response } from 'express';
import { tryCatch } from '../utils/tryCatch';
import { ILocationResponse } from '@src/types/tequila.type';
import { getLocations } from '../controllers/location.controller';

const router = express.Router();

router.get('/', tryCatch(async (req: Request, res: Response) => {
  const locations: ILocationResponse[] = await getLocations(req);
  return res.json(locations);
}));

export default router;