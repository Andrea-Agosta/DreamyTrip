import { format } from 'date-fns';
import React, { ChangeEvent, useState } from 'react';
import { IAirports } from '../../../types/airport.type';
import Suggestions from './Suggestions';

interface InputGroup {
  component: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: { flyFrom: string; flyTo: string; dateFrom: string; dateTo: string };
  suggestions: { from: IAirports[]; to: IAirports[] };
  handleSuggestions: (suggestion: IAirports, component: string) => void;
}

function InputGroup({
  component,
  handleChange,
  inputValue,
  suggestions,
  handleSuggestions,
}: InputGroup) {
  const [isFocused, setIsFocused] = useState(false);
  const today = format(new Date(), 'yyyy-MM-dd');
  const suggestionLocation = component === 'From' ? suggestions.from : suggestions.to;

  const closeSuggestion = () => setIsFocused(false);

  return (
    <>
      <label htmlFor={component}>
        {component.toUpperCase()}
        :
      </label>
      {component === 'Departure' || component === 'Return' ? (
        <input
          className="p-2 font-normal text-blue-secondary border-radius rounded-md"
          type="date"
          id={component}
          name={component}
          min={today}
          value={component === 'Departure' ? inputValue.dateFrom : inputValue.dateTo}
          onChange={handleChange}
        />
      ) : (
        <div className="relative">
          <input
            className="w-full p-2 font-normal text-blue-secondary border-radius rounded-md"
            type="text"
            id={component}
            name={component}
            value={inputValue[component === 'From' ? 'flyFrom' : 'flyTo']}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
          />
          {isFocused && suggestionLocation.length > 0 && (
            <Suggestions
              suggestions={suggestionLocation}
              component={component}
              handleSuggestions={handleSuggestions}
              closeSuggestion={closeSuggestion}
            />
          )}
        </div>
      )}
    </>
  );
}

export default InputGroup;
