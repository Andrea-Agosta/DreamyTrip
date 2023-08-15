import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
// import passport from 'passport';
import user from './api/user';
import auth from './api/auth';
import searchFlight from './api/searchFlight';
import { errorHandler } from './middleware/errorHandler';
import { placesListUpdate } from './jobs/placeList';
import location  from './api/location';
import geolocation from './middleware/geolocation';


const app: Application = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

placesListUpdate();

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/flight/search', searchFlight);
app.use('/api/location', location);
app.use(geolocation);

app.get('/', (_req: Request, res: Response) => {
  res.json({ 'message': 'Read our documentation for more details' });
});

app.use(errorHandler);

export default app;