import React, { ChangeEvent, useEffect, useState } from 'react';
import format from 'date-fns/format';
import { isAfter, parse } from 'date-fns';
import Select from '../Select/Select';
import Datepicker from './body/Datepicker';
import server from '../../api/server';

function SearchControl() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState({ dateFrom: today, dateTo: today });
  const selectComponents = ['flight_from', 'flight_to'];
  const dateComponents = ['Departure', 'Return'];

  const handleSelectChange = () => {};

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'Departure') {
      const departureDate = parse(event.target.value, 'yyyy-MM-dd', new Date());
      const returnDate = parse(date.dateTo, 'yyyy-MM-dd', new Date());
      if (isAfter(departureDate, returnDate)) {
        return setDate({ dateFrom: event.target.value, dateTo: event.target.value });
      }
      return setDate({ ...date, dateFrom: event.target.value });
    }
    return setDate({ ...date, dateTo: event.target.value });
  };

  useEffect(() => {
    server({ select: 'code name' }, '/api/location').then((response) => console.log(response));
  }, []);

  return (
    <section className="p-5 flex bg-blue-dark gap-4 text-blue-lighter font-lato font-bold text-xl text-left">
      <form className="w-full">
        <ul>
          {selectComponents.map((select, index) => (
            <li
              key={select}
              className={`flex flex-col ${index === selectComponents.length} && mb-2`}
            >
              <label htmlFor={select}>
                {select.split('_')[1].toUpperCase()}
                :
              </label>
              <Select handleSelectChange={handleSelectChange} componentName={select} selected="" />
            </li>
          ))}
          {dateComponents.map((singleDate) => (
            <li key={singleDate} className="mb-2 flex flex-col gap-1">
              <Datepicker singleDate={singleDate} handleDataChange={handleDataChange} date={date} />
            </li>
          ))}
        </ul>
      </form>
    </section>
  );
}

export default SearchControl;
