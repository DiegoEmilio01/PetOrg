import React, { useEffect, useState } from 'react';
import AnimalFilter from './AnimalFilter'
import OrderBy from './OrderBy'
import PetCard from './PetCard'
import SearchBar from './SearchBar'
import SizeFilter from './SizeFilter'
import { hot } from 'react-hot-loader';

function PetDisplay() {
  const [memoryPets, setMemoryPets] = useState([]);
  const [filteredpets, setFilteredpets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderKey, setOrderKey] = useState('name');
  const [animalsFilter, setAnimalsFilter] = useState([]);
  const [sizesFilter, setSizesFilter] = useState({'S': true, 'M': true, 'L': true});
  const [animals, setAnimals] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if(!loaded){
      setLoaded(true)
      getPets();
      getAnimals();
    }
    let tempPets = [...memoryPets]
    console.log(tempPets);
    tempPets = searchFilter(tempPets);
    order(tempPets);
    tempPets = animalFilter(tempPets);
    tempPets = sizeFilter(tempPets);
    setFilteredpets(tempPets);
    console.log(tempPets);
    
  }, [ searchTerm, orderKey, animalsFilter, sizesFilter, memoryPets, animals])

  const getPets = async () => {
    fetch('/pets/petsJson', { Accept: 'application/json' })
    .then((response) => response.json())
    .then((jresponse) => {
      setMemoryPets(jresponse);
    })
  }
  
  const getAnimals = async () => {
    fetch('/animals/animalsJson', { Accept: 'application/json' })
    .then((response) => response.json())
    .then((jresponse) => {
      setAnimals(jresponse);
      setAnimalsFilter(jresponse);
    })
  }

  const search = (temporalSearch) => {
    setSearchTerm(temporalSearch);
  }

  const searchFilter = (petsList) => {
    return petsList.filter(pet => pet.name.includes(searchTerm));
  }
  const order = petsList => {
    if (orderKey === 'name'){
      petsList.sort((a,b) => a.name > b.name?1:-1);
    } else if (orderKey === 'size') {
      petsList.sort((a,b) => a.size < b.size?1:-1); // se aprovecha de que L, M y S están en orden alfabético
    } else if (orderKey === 'age') {
      petsList.sort((a,b) => a.age - b.age);
    }
  }
  const animalFilter = (petsList) => {
    return petsList.filter(pet => animalsFilter.includes(pet.animal.animal));
  }
  const sizeFilter = (petsList) => { 
    return petsList.filter(pet => sizesFilter[pet.size]);
  }

return (
  <>
    <div className={'Search_Items'}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <OrderBy orderKey={orderKey} setOrderKey={setOrderKey}/>
      
      
    </div>
    <div className="card_index">
      {filteredpets.map((pet, i) => 
        <PetCard key={i} pet={pet}/>
      )}
    </div>
  </>
)

}

export default hot(module)(PetDisplay);

// <AnimalFilter animals={animals} animalsFilter={animalsFilter} setAnimalsFilter={setAnimalsFilter}/>
// <SizeFilter sizesFilter={sizesFilter} setSizesFilter={setSizesFilter}/>
// 
