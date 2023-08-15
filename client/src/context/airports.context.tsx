import React, { createContext, useMemo, useState } from 'react';
import { IAirports } from '../types/airport.type';

interface IAirportsContext {
  airport: IAirports[];
  setAirport: React.Dispatch<React.SetStateAction<IAirports[]>>;
}

interface IData {
  children: JSX.Element;
}

export const AirportsContext = createContext<IAirportsContext>({} as IAirportsContext);

export function AirportsContestProvider({ children }: IData) {
  const [airport, setAirport] = useState<IAirports[]>([]);
  const contextValue = useMemo(() => ({ airport, setAirport }), [airport, setAirport]);
  return <AirportsContext.Provider value={contextValue}>{children}</AirportsContext.Provider>;
}
