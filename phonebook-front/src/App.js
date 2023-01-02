import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsShow from './components/PersonsShow'
import phoneService from './services/phones'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [addMessage, setAddMessage] = useState(null)
  const [removeMessage, setRemoveMessage] = useState(null)
  const [dto, setDto] = useState({
    name : '',
    number: ''
  });
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPhone = (event) => {
    event.preventDefault()
    phoneService
      .create(dto)
      .then(returned => {
        setPersons(persons.concat(returned))

        setDto({
          name : '',
          number: '',
        })

        setAddMessage(
          `Added ${returned.name}`
        )

        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
      })
  }

  const handleChanges = (event) => {
    const {name, value} = event.target;
    setDto({
      ...dto,
      [name]: value,
    })
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const toSave = (event) => {
    event.preventDefault();
    let personAux = persons.filter(person => person.name === dto.name)
    if (personAux.length > 0) {
      if(window.confirm(`${dto.name} is alredy added to phonebook`)){
        phoneService
          .update(personAux.id, dto)
          .then(result => 
            console.log("actualizado")
            )
      }
    } else {
      addPhone(event);
    }
  }

  const handleDelete = id => {
    let persona = persons.find(elem => elem.id===id)
    if(window.confirm(`Delete ${persona.name} ?`)){
      phoneService
      .remove(id)
      .then(result => {
        setPersons(persons.filter(elem => elem.id !== id))
      })
      .catch(error=>{
        setRemoveMessage(
          `Information of ${persona.name} was already removed from server`
        )
        setTimeout(() => {
          setRemoveMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  const personsToShow = filter.length > 0 ? persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLowerCase())) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={addMessage} />
      <ErrorNotification message={removeMessage} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm toSave={toSave} handleChanges={handleChanges} dto={dto} />
      <h2>Numbers</h2>
      <PersonsShow personsToShow={personsToShow} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App
