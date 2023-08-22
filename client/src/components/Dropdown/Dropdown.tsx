import React, { useState, MouseEvent } from 'react';
import PassengersBags from './body/PassengersBags';
import { IBaggages, ISearchFlightRequest } from '../../types/searchFlight.type';

interface IDropdown {
  handleCount: (event: MouseEvent<HTMLButtonElement>) => void;
  baggages: IBaggages;
  searchParams: ISearchFlightRequest;
}

function Dropdown({ handleCount, baggages, searchParams }: IDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="dropdown">
      <button type="button" className="btn m-1" onClick={() => setIsOpen(!isOpen)}>
        Click
      </button>
      <div
        className={`p-4 shadow bg-base-100 rounded-box w-64 absolute z-[1] ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <PassengersBags handleCount={handleCount} baggages={baggages} searchParams={searchParams} />
      </div>
    </div>
  );
}

export default Dropdown;
