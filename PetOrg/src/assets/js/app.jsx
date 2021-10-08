import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import PetDisplay from './components/Filters/PetDisplay';
import ToggleContainer from './components/dashboard/ToggleContainer';
import ProductView from './components/ProductView';
import FactDisplay from './components/FactDisplay';

const reactAppContainer = document.getElementById('react-app');
if (reactAppContainer) {
  ReactDOM.render(<App />, reactAppContainer);
}

const reactPetDisplay = document.getElementById('PetDisplay');
if (reactPetDisplay) {
  ReactDOM.render(<PetDisplay />, reactPetDisplay)
}

const reactToggleContainer = document.getElementById('toggleContainer');
if (reactToggleContainer) {
  const paths = JSON.parse(reactToggleContainer.dataset.paths);
  ReactDOM.render(<ToggleContainer paths={paths}/>, reactToggleContainer);
}

const reactProductCartContainer = document.getElementById('react-product-cart');
if (reactProductCartContainer) {
  ReactDOM.render(<ProductView />, reactProductCartContainer);
}

const reactFactDisplay = document.getElementById('fact_display');
if (reactFactDisplay) {
  ReactDOM.render(<FactDisplay />, reactFactDisplay);
}
