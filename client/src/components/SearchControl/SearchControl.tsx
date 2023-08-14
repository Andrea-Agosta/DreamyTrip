import React, { ChangeEvent, useState } from 'react';
import format from 'date-fns/format';
import Select from '../Select/Select';
import Datepicker from './body/Datepicker';

function SearchControl() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState({ dateFrom: today, dateTo: today });
  const selectComponents = ['flight_from', 'flight_to'];
  const dateComponents = ['Departure', 'Return'];
  const handleSelectChange = () => {};
  const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'Departure') {
      return setDate({ ...date, dateFrom: event.target.value });
    }
    return setDate({ ...date, dateTo: event.target.value });
  };

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
