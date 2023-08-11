import React, { ChangeEvent } from 'react';
import { BsCurrencyExchange } from 'react-icons/bs';
import { TfiWorld } from 'react-icons/tfi';
import Select from '../../Select/Select';
import { ICountry } from '../../../types/country.type';

interface ICountryCurrency {
  handleSelectChange(event: ChangeEvent<HTMLSelectElement>): void;
  defaultValue: ICountry;
}

export default function CountryCurrency({ handleSelectChange, defaultValue }: ICountryCurrency) {
  return (
    <>
      <h3 className="font-bold text-lg font-lato">Regional Setting</h3>
      <ul>
        <li>
          <label htmlFor="country" className="mt-10 pb-1 flex flex-row gap-3 md:text-xl">
            <TfiWorld className="mt-1" />
            Country / Region
          </label>
          <p className="text-xs font-medium mb-2">
            Selecting the country you’re in will give you local deals and information.
          </p>
          <Select
            handleSelectChange={handleSelectChange}
            componentName="country"
            selected={defaultValue.country_name}
          />
        </li>
        <li>
          <label htmlFor="country" className="mt-10 pb-1 flex flex-row gap-3 md:text-xl">
            <BsCurrencyExchange className="mt-1" />
            Currency
          </label>
          <Select
            handleSelectChange={handleSelectChange}
            componentName="currency"
            selected={defaultValue.country_currency}
          />
        </li>
      </ul>
    </>
  );
}
