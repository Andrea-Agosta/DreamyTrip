import express, { Request, Response } from 'express';
import { tryCatch } from '../utils/tryCatch';
import { ICountry } from '../types/country.type';

const router = express.Router();

router.get('/geolocation', tryCatch(async (_req: Request, res: Response) => {
  const country: ICountry = await getUserCountry();
  return res.json(country);
}));

export default router;
