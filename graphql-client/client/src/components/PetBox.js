import React from 'react'

const PetBox = ({pet}) => (
  <div className="pet">
    
      <img src={pet.img + `?pet=${pet.id}`} alt=""/>
    
    <div className="pet-name">{pet.name}</div>
    <div className="pet-type">{pet.type}</div>
  </div>
)

export default PetBox
