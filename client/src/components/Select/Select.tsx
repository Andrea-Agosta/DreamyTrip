import React, { ChangeEvent } from 'react';
import countries from '../../assets/countiesList.json';

interface ISelect {
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  componentName: string;
  selected: string;
}

export default function Select({ handleSelectChange, componentName, selected }: ISelect) {
  return (
    <select
      className="w-full p-2 my-1 border border-blue-light rounded-lg focus:ring-blue-primary focus:ring-2 focus:outline-none text-blue-secondary text-lg"
      onChange={handleSelectChange}
      id={componentName}
      value={selected}
    >
      {countries.map((country: any) => (
        <option key={country.name} value={country.name}>
          {country.emoji}
          {' '}
          {country.name}
        </option>
      ))}
    </select>
  );
}
