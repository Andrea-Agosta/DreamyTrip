import express, { Request, Response } from 'express';
import { tryCatch } from '../utils/tryCatch';
import { ISearchFlightsResponse } from '../config/type/tequilaType';

const router = express.Router();

router.get('/', tryCatch(async (_req: Request, res: Response) => {
  const flights: ISearchFlightsResponse[] = await getFlights();
  return res.json(flights);
}));

export default router;