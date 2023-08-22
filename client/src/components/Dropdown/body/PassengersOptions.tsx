import React, { MouseEvent } from 'react';

interface IPassengersOptions {
  name: string;
  value: number;
  handleCount: (event: MouseEvent<HTMLButtonElement>) => void;
}

function PassengersOptions({ name, value, handleCount }: IPassengersOptions) {
  const btnStyle = 'm-0 w-7 h-7 border border-blue-secondary text-center text-blue-secondary hover:bg-blue-lighter rounded-full transition duration-300 active:bg-blue-primary';
  return (
    <li className="flex flex-row justify-between mb-3">
      <p className="text-base pt-1">{name}</p>
      <div className="flex flex-row justify-end text-base">
        <div className="flex items-center">
          <button type="button" id="minus" name={name} className={btnStyle} onClick={handleCount}>
            -
          </button>
          <p className="text-center m-0 mt-1 w-7 h-7">{value}</p>
          <button type="button" id="add" name={name} className={btnStyle} onClick={handleCount}>
            +
          </button>
        </div>
      </div>
    </li>
  );
}

export default PassengersOptions;
