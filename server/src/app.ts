import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
// import passport from 'passport';
import user from './api/user';
import auth from './api/auth';
import { errorHandler } from './middleware/errorHandler';

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

app.use(errorHandler);

export default app;