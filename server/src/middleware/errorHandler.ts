import logger from '../../log/config';
import { BadRequestError, NotFoundError } from '../utils/customErrors';
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode: number;
}

export const errorHandler = (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  switch (true) {
    case error instanceof BadRequestError:
      return res.status(error.statusCode).json({ message: error.message });
    case error instanceof NotFoundError:
      return res.status(error.statusCode).json({ message: error.message });
    default:
      logger?.error(`${error}`);
      return res.status(500).send('An unknown error occurred');
  }
};