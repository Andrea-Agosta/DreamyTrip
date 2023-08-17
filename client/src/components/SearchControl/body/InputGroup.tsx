import { format } from 'date-fns';
import React, { ChangeEvent, useState } from 'react';
import { IAirports } from '../../../types/airport.type';
import Suggestions from './Suggestions';

interface InputGroup {
  component: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  date: { dateFrom: string; dateTo: string };
  autoComplete: { from: IAirports[]; to: IAirports[] };
}

function InputGroup({
  component, handleChange, date, autoComplete,
}: InputGroup) {
  const [isFocused, setIsFocused] = useState(false);
  const today = format(new Date(), 'yyyy-MM-dd');
  const suggestions = component === 'From' ? autoComplete.from : autoComplete.to;

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
          value={component === 'Departure' ? date.dateFrom : date.dateTo}
          onChange={handleChange}
        />
      ) : (
        <div className="relative">
          <input
            className="w-full p-2 font-normal text-blue-secondary border-radius rounded-md"
            type="text"
            id={component}
            name={component}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {isFocused && suggestions.length > 0 && (
            <Suggestions suggestions={suggestions} component={component} />
          )}
        </div>
      )}
    </>
  );
}

export default InputGroup;
