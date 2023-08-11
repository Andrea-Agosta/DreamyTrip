import axios from 'axios';
import { ICountry } from '../types/country.type';

export const getUserCountry = async (): Promise<ICountry> => {
  try {
    const options = {
      method: 'GET',
      url: process.env.GEOLOCATION,
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};