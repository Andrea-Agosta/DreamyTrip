import { format } from 'date-fns';
import React, { ChangeEvent, useState } from 'react';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';
import { IAirports } from '../../../types/airport.type';

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
          {isFocused && (autoComplete.from.length > 0 || autoComplete.to.length > 0) && (
            <ul className="absolute z-10 bg-white border border-gray-300 mt-2 rounded shadow-lg">
              {component === 'From'
                ? autoComplete.from.map((suggestion) => (
                  <li
                    key={suggestion.code}
                    className="px-4 py-2 cursor-pointer text-sm text-blue-secondary flex border-b"
                  >
                    {component === 'From' ? (
                      <MdFlightTakeoff className="mr-3" />
                    ) : (
                      <MdFlightLand className="mr-3" />
                    )}
                    {suggestion.name}
                    (
                    {suggestion.code}
                    )
                  </li>
                ))
                : autoComplete.to.map((suggestion) => (
                  <li
                    key={suggestion.code}
                    className="px-4 py-2 cursor-pointer text-sm text-blue-secondary flex border-b"
                  >
                    {component === 'From' ? (
                      <MdFlightTakeoff className="mr-3" />
                    ) : (
                      <MdFlightLand className="mr-3" />
                    )}
                    {suggestion.name}
                    (
                    {suggestion.code}
                    )
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default InputGroup;
