import { format } from 'date-fns';
import React, { ChangeEvent } from 'react';

interface IDataPicker {
  singleDate: string;
  handleDataChange: (event: ChangeEvent<HTMLInputElement>) => void;
  date: { dateFrom: string; dateTo: string };
}

function Datepicker({ singleDate, handleDataChange, date }: IDataPicker) {
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <>
      <label htmlFor={singleDate}>
        {singleDate.toUpperCase()}
        :
      </label>
      <input
        className="p-2 font-normal text-blue-secondary border-radius rounded-md"
        type="date"
        id={singleDate}
        name={singleDate}
        min={today}
        value={singleDate === 'Departure' ? date.dateFrom : date.dateTo}
        onChange={handleDataChange}
      />
    </>
  );
}

export default Datepicker;
