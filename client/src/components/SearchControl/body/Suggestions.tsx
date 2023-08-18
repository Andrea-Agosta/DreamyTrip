import React from 'react';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';
import { IAirports } from '../../../types/airport.type';

interface ISuggestions {
  suggestions: IAirports[];
  component: string;
  handleSuggestions: (suggestion: IAirports, component: string) => void;
  closeSuggestion: () => void;
}

function Suggestions({
  suggestions, component, handleSuggestions, closeSuggestion,
}: ISuggestions) {
  return (
    <ul className="absolute z-10 bg-white border border-gray-300 mt-2 rounded shadow-lg">
      {suggestions.map((suggestion) => (
        <li key={suggestion.code}>
          <button
            type="button"
            className="px-4 py-2 cursor-pointer text-sm text-blue-secondary flex border-b"
            onMouseDown={(e) => {
              e.preventDefault();
              handleSuggestions(suggestion, component);
              closeSuggestion();
            }}
          >
            {component === 'From' ? (
              <MdFlightTakeoff className="mr-3" />
            ) : (
              <MdFlightLand className="mr-3" />
            )}
            {`${suggestion.name} (${suggestion.code})`}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
