import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
// import passport from 'passport';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import user from './api/user';
import { BadRequestError, NotFoundError } from './utils/customErrors';
import auth from './api/auth';


const app: Application = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/user', user);
app.use('/api/auth', auth);

app.get("/", (_req: Request, res: Response) => {
  res.json({ "message": "Read our documentation for more details" })
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  switch (error.constructor) {
    case BadRequestError:
      return res.status(400).send(error.message);
    case NotFoundError:
      return res.status(404).send(error.message);
    default:
      console.error(error);
      return res.status(500).send('An unknown error occurred');
  }
});

export default app;