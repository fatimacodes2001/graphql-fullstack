import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const PETS = gql`
  query AllPets{
    pets{
      id
      name
      type
      img
    }
  } 

`

const ADD_PET = gql`
  mutation createPet($newPet: NewPetInput!){
    addPet(input:$newPet){
      id
      name
      type
      img
    }
  }
`

export default function Pets () {
  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(PETS)
  const [createPet, newPet] = useMutation(ADD_PET,
    {
      update(cache, {data: {addPet}}){
        const data = cache.readQuery({query: PETS})
        cache.writeQuery(
          {
            query: PETS,
            data: { pets: [addPet, ...data.pets] }
          }
        )
      }
    }
    )
  

  const onSubmit = (input) => {
    createPet({
      variables:{newPet: input}
    })
    setModal(false)
  }

  if(loading){
    return <Loader />
  }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets}/>
      </section>
    </div>
  )
}
