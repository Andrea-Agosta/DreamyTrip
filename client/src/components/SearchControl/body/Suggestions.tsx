import React from 'react';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';
import { IAirports } from '../../../types/airport.type';

function Suggestions({ suggestions, component }: { suggestions: IAirports[]; component: string }) {
  return (
    <ul className="absolute z-10 bg-white border border-gray-300 mt-2 rounded shadow-lg">
      {suggestions.map((suggestion) => (
        <li
          key={suggestion.code}
          className="px-4 py-2 cursor-pointer text-sm text-blue-secondary flex border-b"
        >
          {component === 'From' ? (
            <MdFlightTakeoff className="mr-3" />
          ) : (
            <MdFlightLand className="mr-3" />
          )}
          {`${suggestion.name} (${suggestion.code})`}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
