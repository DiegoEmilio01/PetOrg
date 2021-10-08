import React from 'react';
import { hot } from 'react-hot-loader';

function PetCard({orderKey, setOrderKey}) {
const handleChange = (e) => {
  e.preventDefault();
  setOrderKey(e.target.value)
}

return (
  <>
  <label>Ordernar por:</label>
  <select value={orderKey} onChange={handleChange}>
    <option value="name">Nombre</option>
    <option value="size">Tamaño</option>
    <option value="age">Edad</option>
  </select>
  </>
)  
}

export default hot(module)(PetCard);
