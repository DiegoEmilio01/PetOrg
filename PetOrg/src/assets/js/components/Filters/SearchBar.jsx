import React , { useState } from 'react';
import { hot } from 'react-hot-loader';

function PetCard({searchTerm, setSearchTerm}) {
  const [temporalSearch, setTemporalSearch] = useState(searchTerm); 

return (
  <div className={'Search_Bar'}>
    <input
            className={'searchbar-input'}
            type="text"
            placeholder="Busca un nombre"
            value={temporalSearch}
            onChange={(event) => setTemporalSearch(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' ? setSearchTerm(temporalSearch) : null}
    />
    <button className={'search-button'} onClick={(event) => setSearchTerm(temporalSearch)}>
        Buscar
    </button>
  </div>
)  

  
        
}

export default hot(module)(PetCard);
