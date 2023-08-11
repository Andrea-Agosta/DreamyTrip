import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/images/logo2.svg';
import Modal from '../Modal/Modal';
import { CountryContext } from '../../context/country.context';
import server from '../../api/server';
import { CountryInfo, ICountryCurrencyList } from '../../types/country.type';
import countriesList from '../../data/countiesList.json';

declare const countryToCurrency: CountryInfo;

function Navbar() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { setCountry } = useContext(CountryContext);

  const getCodeEmoji = (code: string) => {
    const countryData = countriesList.find(
      (country: ICountryCurrencyList) => country.code === code,
    );
    return countryData ? countryData.emoji : '';
  };

  useEffect(() => {
    server(null, '/geolocation').then((resp) => {
      const currencyCode = countryToCurrency[resp.country_code];
      const flag: string = getCodeEmoji(resp.country_code);
      setCountry({
        country_name: resp.country_name,
        country_currency: currencyCode,
        country_flag: flag,
      });
    });
  }, []);

  return (
    <>
      <nav className="h-16 flex justify-between p-3 text-3xl text-blue-primary font-bold">
        <div className="flex flex-row gap-4 items-center">
          <img src={logo} alt="logo" className="h-14" style={{ fill: 'blue' }} />
          <h2 className="font-marcellus">
            Dreamy
            {' '}
            <span className="text-blue-secondary">Flight</span>
          </h2>
        </div>
        <div className="hidden md:inline -mt-1">
          {/* {createPortal(<Modal />, document.body)} */}
          <Modal type="countryCurrency" />
        </div>
        <button
          type="button"
          className="p-2 ml-3 text-blue-secondary rounded-lg md:hidden focus:text-blue-primary focus:outline-none focus:ring-2 focus:ring-blue-primary"
          onClick={() => setIsClicked(!isClicked)}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1
               1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
      {/* navbar mobile menu */}
      <nav className={`border ${isClicked ? 'block' : 'hidden'}`}>
        <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <Modal type="countryCurrency" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
