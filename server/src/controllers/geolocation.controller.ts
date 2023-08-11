import { ICountry } from '../types/country.type';
import { getUserCountry as getUserCountryService} from '../service/geolocation.service';

export const getUserCountry = async (): Promise<ICountry> => {
  return await getUserCountryService();
};