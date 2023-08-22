import React, { MouseEvent } from 'react';
import PassengersOptions from './PassengersOptions';
import { IBaggages, ISearchFlightRequest } from '../../../types/searchFlight.type';

interface IPassengersbags {
  handleCount: (event: MouseEvent<HTMLButtonElement>) => void;
  baggages: IBaggages;
  searchParams: ISearchFlightRequest;
}

function PassengersBags({ handleCount, baggages, searchParams }: IPassengersbags) {
  const elements = ['Passengers', 'Bags'];
  const passengers = ['Adults', 'Children', 'Infants'];
  const bags = ['Cabin baggage', 'Checked baggage'];

  return (
    <ul>
      {elements.map((element) => (
        <div key={element}>
          <h3 className="mb-2 text-lg text-blue-secondary">{element}</h3>
          <ul className="text-black" />
          {element === 'Passengers'
            ? passengers.map((passenger: string) => {
              const passengerLowerCase = passenger.toLowerCase();
              return (
                <PassengersOptions
                  key={passenger}
                  name={passenger}
                  value={searchParams[passengerLowerCase as keyof ISearchFlightRequest] as number}
                  handleCount={handleCount}
                />
              );
            })
            : bags.map((bag: string) => (
              <PassengersOptions
                key={bag}
                name={bag}
                value={bag === 'Cabin baggage' ? baggages.hand : baggages.hold}
                handleCount={handleCount}
              />
            ))}
        </div>
      ))}
    </ul>
  );
}

export default PassengersBags;
