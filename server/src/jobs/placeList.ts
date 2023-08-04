import cron from 'node-cron';
import { saveLocations } from '../service/locations.service';
import logger from '../../log/config';


export const placesListUpdate = () => {
  const queryParams = {
    locale: 'en-US',
    location_types: 'airport',
    limit: 10000,
    sort: 'name',
    active_only: false,
    search_after: [],
  };
  const path = '/locations/dump';

  cron.schedule('0 0 1 * *', () => {
    logger?.info('store Location job start');
    saveLocations(queryParams, path);
  });
};
