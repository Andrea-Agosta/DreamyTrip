import React, {
  ChangeEvent, useContext, useEffect, useState, MouseEvent,
} from 'react';
import format from 'date-fns/format';
import { isAfter, parse } from 'date-fns';
import Dropdown from '../Dropdown/Dropdown';
import InputGroup from './body/InputGroup';
import server from '../../api/server';
import { AirportsContext } from '../../context/airports.context';
import { IAirports } from '../../types/airport.type';
import { IBaggages, ISearchFlightRequest } from '../../types/searchFlight.type';

function SearchControl() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [searchParams, setSearchParams] = useState<ISearchFlightRequest>({
    fly_from: '',
    fly_to: '',
    date_from: today,
    date_to: today,
    adults: 1,
    children: 0,
    infants: 0,
    adult_hold_bag: '0',
    adult_hand_bag: '0',
    child_hold_bag: '0',
    child_hand_bag: '0',
  });
  const [suggestions, setSuggestions] = useState({
    from: [] as IAirports[],
    to: [] as IAirports[],
  });
  const [baggages, setBaggages] = useState<IBaggages>({ hand: 0, hold: 0 });
  const { airport, setAirport } = useContext(AirportsContext);
  const componentsName = ['From', 'To', 'Departure', 'Return'];

  const suggestionsFilter = (value: string): IAirports[] => {
    const normalizedValue = value.toLowerCase();
    if (value.length === 0) return [];

    const filteredList = airport.filter(
      (item) => item.name.toLowerCase().includes(normalizedValue)
        || item.code.toLowerCase().includes(normalizedValue),
    );

    const searchForCode = filteredList.find((item) => item.code.toLowerCase() === normalizedValue);
    if (searchForCode) {
      const otherSuggestions = filteredList.filter((item) => item !== searchForCode);
      return [searchForCode, ...otherSuggestions.slice(0, 9)];
    }

    return filteredList.slice(0, 10);
  };

  const updateBaggages = (id: string, name: string) => {
    if (id === 'add') {
      return setBaggages((prevBaggages) => ({ ...prevBaggages, [name]: prevBaggages.hand + 1 }));
    }
    return setBaggages((prevBaggages) => ({ ...prevBaggages, [name]: prevBaggages.hand - 1 }));
  };

  const handleCount = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const { name, id } = target;
    const propertyName = name.toLowerCase();
    switch (name) {
      case 'Cabin baggage':
        updateBaggages(id, 'hand');
        break;
      case 'Checked baggage':
        updateBaggages(id, 'hold');
        break;
      default:
        setSearchParams((prev) => {
          const propertyValue = prev[propertyName as keyof ISearchFlightRequest];
          if (typeof propertyValue === 'number') {
            return id === 'add'
              ? { ...prev, [propertyName]: propertyValue + 1 }
              : { ...prev, [propertyName]: propertyValue - 1 };
          }
          return prev;
        });
        break;
    }
  };

  const handleSuggestions = (suggestion: IAirports, component: string): void => {
    const newValue = `${suggestion.name} (${suggestion.code})`;
    setSearchParams((prev) => ({
      ...prev,
      [component === 'From' ? 'fly_from' : 'flyTo']: newValue,
    }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const departureDate = parse(event.target.value, 'yyyy-MM-dd', new Date());
    const returnDate = parse(searchParams.date_to, 'yyyy-MM-dd', new Date());
    switch (event.target.name) {
      case 'From':
        setSearchParams((prev) => ({
          ...prev,
          fly_from: event.target.value,
        }));
        setSuggestions({
          ...suggestions,
          from: suggestionsFilter(event.target.value),
        });
        break;
      case 'To':
        setSearchParams((prev) => ({
          ...prev,
          flyTo: event.target.value,
        }));
        setSuggestions({
          ...suggestions,
          to: suggestionsFilter(event.target.value),
        });
        break;
      case 'Departure':
        if (isAfter(departureDate, returnDate)) {
          setSearchParams({
            ...searchParams,
            date_from: event.target.value,
            date_to: event.target.value,
          });
        } else {
          setSearchParams({ ...searchParams, date_from: event.target.value });
        }
        break;
      case 'Return':
        setSearchParams({ ...searchParams, date_to: event.target.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    server({ select: 'code name' }, '/api/location').then((response) => setAirport(response));
  }, []);

  return (
    <form className="p-5 flex flex-col bg-blue-dark/90 gap-4 font-lato font-bold text-xl text-left">
      <Dropdown handleCount={handleCount} baggages={baggages} searchParams={searchParams} />
      <div className="w-full text-blue-lighter">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {componentsName.map((component) => (
            <li key={component} className="mb-2 flex flex-col gap-1">
              <InputGroup
                component={component}
                handleChange={handleInputChange}
                searchParams={searchParams}
                suggestions={suggestions}
                handleSuggestions={handleSuggestions}
              />
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default SearchControl;
