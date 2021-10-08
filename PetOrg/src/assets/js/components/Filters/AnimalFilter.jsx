import React from 'react';
import { hot } from 'react-hot-loader';

function AnimalFilter({ animals, animalsFilter, setAnimalsFilter }) {

  const handleChange = (e) => {
    e.preventDefault();
    setAnimalsFilter(e.target.value)
  }
  return (
    <select value={animalsFilter} onChange={handleChange} multiple >
      {animals.forEach(animal => 
        <option value={animal}>{animal}</option>
      )}
    </select>
  )  
}

export default hot(module)(AnimalFilter);
