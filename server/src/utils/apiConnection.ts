import { ILocationQueryOptions } from '../config/type/tequilaType';
import axios from 'axios';

export const tequilaClient = async (queryParams: ILocationQueryOptions, path: string) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://tequila-api.kiwi.com' + path,
      params: queryParams,
      headers: { 'apikey': process.env.API_KEY_TEQUILA }
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error('Failed to make the API request');
  }
};
