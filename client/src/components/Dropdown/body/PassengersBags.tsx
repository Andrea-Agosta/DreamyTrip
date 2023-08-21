import React from 'react';
import PassengersOptions from './PassengersOptions';

function PassengersBags() {
  const elements = ['Passengers', 'Bags'];
  return (
    <>
      {elements.map((name: string) => (
        <PassengersOptions name={name} key={name} />
      ))}
    </>
  );
}

export default PassengersBags;
