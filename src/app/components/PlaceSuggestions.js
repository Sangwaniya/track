import React from 'react';

const PlaceSuggestions = ({ suggestions, onSelect }) => {
  return (
    <div className="relative">
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white rounded-3xl border border-gray-100 rounded shadow-lg z-10">
          {suggestions.slice(0, 5).map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-3 hover:bg-gray-200 cursor-pointer"
              onClick={() => onSelect(suggestion)}
            >
              <span className="font-semibold">{suggestion.location}</span>
              <br />
              <span className="text-sm text-gray-500">{suggestion.district}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaceSuggestions;
