import React from 'react';
import { hot } from 'react-hot-loader';
import logo from '../../../images/logo.png'
import canSponsor from '../../../images/can_sponsor.png';
import canNotSponsor from '../../../images/cannot_sponsor.png';

function PetCard({pet}) {
return (
  <article className="card">
    {pet.photo?
    <a className="link" href={pet.path}>
      <img className="card_photo" src={pet.photoPath} alt="Foto Mascota"/>
    </a>
    :
    <a className="link" href={pet.path}>
      <img className="card_photo" src={logo} alt="Foto Mascota"/>
    </a>}
    <a className="link" href={pet.path}>
      <h3>{pet.name}</h3>
    </a>
    <div className="card_description">
      <p>Sexo: {(pet.sex == 'm') ? 'Macho':'Hembra'}</p>
      <p>Tamaño: {pet.size}</p>
      <p>Tipo: {pet.animal.animal}</p>
    </div>
    <div className="card_footer">
      <img className="sponsor_icon"
        src={pet.can_sponsor ? canSponsor:canNotSponsor}
        alt={pet.can_sponsor ? 'Apadrinable':'No apadrinable'}
      />
      <button>
        <a className="link" href={pet.path}>Detalle</a>
      </button>
    </div>
  </article>
)  
}

export default hot(module)(PetCard);
