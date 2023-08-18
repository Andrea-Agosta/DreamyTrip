import React, { createContext, useMemo, useState } from 'react';
import { ICountry } from '../types/country.type';

interface ICountriesContext {
  country: ICountry;
  setCountry: React.Dispatch<React.SetStateAction<ICountry>>;
}

interface IData {
  children: JSX.Element;
}

export const CountriesContext = createContext<ICountriesContext>({} as ICountriesContext);

export function CountirsContestProvider({ children }: IData) {
  const [country, setCountry] = useState<ICountry>({
    country_name: '',
    country_currency: '',
    country_flag: '',
  });
  const contextValue = useMemo(() => ({ country, setCountry }), [country, setCountry]);
  return <CountriesContext.Provider value={contextValue}>{children}</CountriesContext.Provider>;
}
