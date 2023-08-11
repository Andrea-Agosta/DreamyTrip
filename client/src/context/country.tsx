import React, { createContext, useMemo, useState } from 'react';
import { ICountry } from '../types/country';

interface ICountryContext {
  country: ICountry;
  setCountry: React.Dispatch<React.SetStateAction<ICountry>>;
}

interface IData {
  children: JSX.Element;
}

export const CountryContext = createContext<ICountryContext>({} as ICountryContext);

export function CartItemsContestProvider({ children }: IData) {
  const [country, setCountry] = useState<ICountry>({
    country_name: '',
    country_code: '',
  });
  const contextValue = useMemo(() => ({ country, setCountry }), [country, setCountry]);
  return <CountryContext.Provider value={contextValue}>{children}</CountryContext.Provider>;
}
