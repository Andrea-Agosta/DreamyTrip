import React from 'react';

function PassengersOptions({ name }: { name: string }) {
  const btnStyle = 'm-0 w-7 h-7 border border-blue-secondary text-center text-blue-secondary hover:text-blue-lighter hover:bg-blue-primary rounded-full transition duration-300';
  const passengers = ['Adults', 'Children', 'Infants'];
  const bags = ['Cabin baggage', 'Checked baggage'];
  return (
    <>
      <h3 className="text-lg text-blue-secondary">{name}</h3>
      <ul className="text-black">
        {name === 'Passengers'
          ? passengers.map((passenger) => (
            <li key={passenger} className="flex flex-row justify-between mb-3">
              <p className="text-base pt-1">{passenger}</p>
              <form className="flex flex-row justify-end text-base">
                <div className="flex items-center">
                  <button type="button" className={`${btnStyle}pt-2`}>
                    -
                  </button>
                  <p className="text-center m-0 mt-1 w-7 h-7">0</p>
                  <div className={btnStyle}>+</div>
                </div>
              </form>
            </li>
          ))
          : bags.map((bag) => (
            <li key={bag} className="flex flex-row justify-between mb-3">
              <p className="text-base pt-1">{bag}</p>
              <form className="flex flex-row justify-end text-base">
                <div className="flex items-center">
                  <button type="button" className={`${btnStyle}pt-2`}>
                    -
                  </button>
                  <p className="text-center m-0 mt-1 w-7 h-7">0</p>
                  <div className={btnStyle}>+</div>
                </div>
              </form>
            </li>
          ))}
      </ul>
    </>
  );
}

export default PassengersOptions;
