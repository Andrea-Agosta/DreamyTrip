import express, { Request, Response } from 'express';
import { tryCatch } from '../utils/tryCatch';
import { ISearchFlightsResponse } from '../types/tequilaType';
import { getFlights } from '../controllers/searchFlight.controller';

const router = express.Router();

router.get('/', tryCatch(async (req: Request, res: Response) => {
  const flights: ISearchFlightsResponse[] = await getFlights(req);
  return res.json(flights);
}));

export default router;