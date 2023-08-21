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
  const [inputValue, setInputValue] = useState({
    flyFrom: '',
    flyTo: '',
    dateFrom: today,
    dateTo: today,
  });
  const [suggestions, setSuggestions] = useState({
    from: [] as IAirports[],
    to: [] as IAirports[],
  });
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

  const handleSuggestions = (suggestion: IAirports, component: string): void => {
    const newValue = `${suggestion.name} (${suggestion.code})`;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [component === 'From' ? 'flyFrom' : 'flyTo']: newValue,
    }));
  };

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const departureDate = parse(event.target.value, 'yyyy-MM-dd', new Date());
    const returnDate = parse(inputValue.dateTo, 'yyyy-MM-dd', new Date());
    switch (event.target.name) {
      case 'From':
        setInputValue((prevInputValue) => ({
          ...prevInputValue,
          flyFrom: event.target.value,
        }));
        setSuggestions({
          ...suggestions,
          from: suggestionsFilter(event.target.value),
        });
        break;
      case 'To':
        setInputValue((prevInputValue) => ({
          ...prevInputValue,
          flyTo: event.target.value,
        }));
        setSuggestions({
          ...suggestions,
          to: suggestionsFilter(event.target.value),
        });
        break;
      case 'Departure':
        if (isAfter(departureDate, returnDate)) {
          setInputValue({
            ...inputValue,
            dateFrom: event.target.value,
            dateTo: event.target.value,
          });
        } else {
          setInputValue({ ...inputValue, dateFrom: event.target.value });
        }
        break;
      case 'Return':
        setInputValue({ ...inputValue, dateTo: event.target.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    server({ select: 'code name' }, '/api/location').then((response) => setAirport(response));
  }, []);

  return (
    <form className="p-5 flex bg-blue-dark/90 gap-4 text-blue-lighter font-lato font-bold text-xl text-left">
      <div className="w-full">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {componentsName.map((component) => (
            <li key={component} className="mb-2 flex flex-col gap-1">
              <InputGroup
                component={component}
                handleChange={handleDataChange}
                inputValue={inputValue}
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
