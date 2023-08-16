import { format } from 'date-fns';
import React, { ChangeEvent } from 'react';
import { IAirports } from '../../../types/airport.type';

interface IDataPicker {
  component: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  date: { dateFrom: string; dateTo: string };
  autoComplete: IAirports[];
}

function InputGroup({
  component, handleChange, date, autoComplete,
}: IDataPicker) {
  const today = format(new Date(), 'yyyy-MM-dd');

  console.log(autoComplete, 'suggestions');

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
        <input
          className="p-2 font-normal text-blue-secondary border-radius rounded-md"
          type="text"
          id={component}
          name={component}
          onChange={handleChange}
        />
      )}
    </>
  );
}

export default InputGroup;
