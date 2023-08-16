import React, {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import format from 'date-fns/format';
import { isAfter, parse } from 'date-fns';
import server from '../../api/server';
import InputGroup from './body/InputGroup';
import { AirportsContext } from '../../context/airports.context';
import { IAirports } from '../../types/airport.type';

function SearchControl() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState({ dateFrom: today, dateTo: today });
  const [autoComplete, setAutoComplete] = useState({
    from: [] as IAirports[],
    to: [] as IAirports[],
  });
  const { airport, setAirport } = useContext(AirportsContext);
  const componentsName = ['From', 'To', 'Departure', 'Return'];

  const autoCompleteFilter = (value: string): IAirports[] => {
    if (value.length === 0) return [];
    const filteredList = airport.filter((item) => (value.length > 3
      ? item.name.toLowerCase().includes(value.toLowerCase())
      : item.code.toLowerCase().includes(value.toLowerCase())));
    return filteredList.slice(0, 5);
  };

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const departureDate = parse(event.target.value, 'yyyy-MM-dd', new Date());
    const returnDate = parse(date.dateTo, 'yyyy-MM-dd', new Date());
    switch (event.target.name) {
      case 'From':
        setAutoComplete({ ...autoComplete, from: autoCompleteFilter(event.target.value) });
        break;
      case 'To':
        setAutoComplete({ ...autoComplete, to: autoCompleteFilter(event.target.value) });
        break;
      case 'Departure':
        if (isAfter(departureDate, returnDate)) {
          setDate({ dateFrom: event.target.value, dateTo: event.target.value });
        } else {
          setDate({ ...date, dateFrom: event.target.value });
        }
        break;
      case 'Return':
        setDate({ ...date, dateTo: event.target.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    server({ select: 'code name' }, '/api/location').then((response) => setAirport(response));
  }, []);

  return (
    <section className="p-5 flex bg-blue-dark gap-4 text-blue-lighter font-lato font-bold text-xl text-left">
      <form className="w-full">
        <ul>
          {componentsName.map((component) => (
            <li key={component} className="mb-2 flex flex-col gap-1">
              <InputGroup
                component={component}
                handleChange={handleDataChange}
                date={date}
                autoComplete={autoComplete}
              />
            </li>
          ))}
        </ul>
      </form>
    </section>
  );
}

export default SearchControl;
