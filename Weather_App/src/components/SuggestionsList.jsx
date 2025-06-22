import React from 'react';

const SuggestionsList = ({ suggestions, onSuggestionClick }) =>
  suggestions.length > 0 ? (
    <ul className="suggestions">
      {suggestions.map((city, index) => (
        <li key={index} onClick={() => onSuggestionClick(city)}>
          {city}
        </li>
      ))}
    </ul>
  ) : null;

export default SuggestionsList;