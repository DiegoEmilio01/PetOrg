import React, { useState } from 'react';
import { hot } from 'react-hot-loader';


const Checkbox = ({ label, isSelected, onCheckboxChange }) => (

  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onClick={onCheckboxChange(label, isSelected)}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);


function SizeFilter({ sizesFilter, setSizesFilter }) {
  console.log(sizesFilter)
  const sizes = sizesFilter;
  const onCheckboxChange = (label, isSelected) => {
    sizes[label] = !isSelected;
    setSizesFilter(sizes);
    console.log('lol');
  }

return (
  <div>
    <Checkbox label={'S'} isSelected={sizes['S']} onCheckboxChange={onCheckboxChange} />
    <Checkbox label={'M'} isSelected={sizes['M']} onCheckboxChange={onCheckboxChange} />
    <Checkbox label={'L'} isSelected={sizes['L']} onCheckboxChange={onCheckboxChange} />
  </div>
)  
}

export default hot(module)(SizeFilter);
