import React, { ChangeEvent } from 'react';
import countries from '../../data/countiesList.json';
import { ICountryCurrencyList } from '../../types/country.type';
import currenciesList from '../../data/currenciesList';

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
      name={componentName}
    >
      {
        {
          country: countries.map((country: ICountryCurrencyList) => (
            <option key={country.name} value={country.name} data-emoji={country.emoji}>
              {`${country.emoji} ${country.name}`}
            </option>
          )),
          currency: currenciesList.map((curr: string) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          )),
        }[componentName]
      }
    </select>
  );
}
