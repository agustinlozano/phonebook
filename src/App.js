import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Form } from './components/Form';
import { Contacts } from './components/Contacts';

const H2 = ({ content }) =>
  <h2>{content}</h2>

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phone: 2477345212
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  
  /* Otener los datos del el servidor la primera vez */
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  
  /* Console info */
  console.log('render', persons.length, 'persons')

  /* Agregar un nuevo contacto a la lista */
  const handlePerson = (event) => {
    event.preventDefault();

    if (validate(newName, persons) === '') {
      alert(`${newName} is already added`);
      setBlankField(setNewName, setNewPhone);

    } else {
      const newPerson = {
        name: newName,
        phone: newPhone
      };
      const newPersons = persons.concat(newPerson);
      setPersons(newPersons);
      setBlankField(setNewName, setNewPhone);
      
      /* Alterar los datos en el servidor */
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          console.log(newPersons)
        })
    }
  }
  
  /* Lo que renderiza la app */
  return (
    <div>
      <H2 content='Phonebook' />
      <Form
        handlePerson={handlePerson}
        name={newName}
        phone={newPhone}
        handleName={handleInput(setNewName)}
        handlePhone={handleInput(setNewPhone)}
      />
      <H2 content='Numbers' />
      <Contacts persons={persons} />
    </div>
  );
}

/* Funciones de las cuales depende la app */

/* Esta funcion que toma como parametro otra funcion
 * se encarga se setear un nuevo campo del formulario
 * independientemente de cual sea
 */
const handleInput = (setField) => {
  const handler = (event) => {
    setField(event.target.value);
  }
  return handler;
}

function validate(newElement, arr) {
  const names = arr.map(element => element.name);
  let result = names.includes(newElement);

  (result)
    ? result = ''
    : result = newElement

  return result;
}

function setBlankField(setName, setPhone) {
  setName('');
  setPhone('');
}

export default App;
