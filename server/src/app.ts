import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';


const app: Application = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/api/user', user);
// app.use('/api/auth', auth);

app.get("/", (_req: Request, res: Response) => {
  res.json({ "message": "Read our documentation for more details" })
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err);
});

export default app;