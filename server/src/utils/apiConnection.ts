import { ILocationQueryOptions, ISearchFlightRequest } from '../types/tequilaType';
import axios from 'axios';

export const tequilaClient = async (queryParams: ILocationQueryOptions | ISearchFlightRequest, path: string) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://tequila-api.kiwi.com' + path,
      params: queryParams,
      headers: { 'apikey': process.env.API_KEY_TEQUILA },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error('Failed to make the API request');
  }
};
