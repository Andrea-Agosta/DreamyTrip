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
import { getLocations } from './repositories/location.repository';
// import { saveLocations } from './service/locations.service';

const app: Application = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

placesListUpdate();

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/flight/search', searchFlight);

app.get("/temp", (_req: Request, res: Response) => {
  // const queryParams = {
  //   locale: 'en-US',
  //   location_types: 'airport',
  //   limit: 10000,
  //   sort: 'name',
  //   active_only: false,
  //   search_after: []
  // }
  // const path = '/locations/dump';
  // const place = saveLocations(queryParams, path);
  getLocations().then((locations) => {
    res.json(locations);
  });
  // res.json(place);
});

app.get("/", (_req: Request, res: Response) => {
  res.json({ "message": "Read our documentation for more details" })
});

app.use(errorHandler);

export default app;