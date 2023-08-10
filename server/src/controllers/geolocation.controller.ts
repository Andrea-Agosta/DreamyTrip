import { ICountry } from "../types/country.type";

export const getUserCountry = async (): Promise<ICountry> => {
  return await getUserCountryService();
};