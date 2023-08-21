import React, { useState } from 'react';
import PassengersBags from './body/PassengersBags';

function Dropdown() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="dropdown">
      <button type="button" className="btn m-1" onClick={() => setIsOpen(!isOpen)}>
        Click
      </button>
      <div className={`p-4 shadow bg-base-100 rounded-box w-64 ${isOpen ? 'block' : 'hidden'}`}>
        <PassengersBags />
      </div>
    </div>
  );
}

export default Dropdown;
