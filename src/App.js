import React, { useState, useEffect } from 'react';
import { Form } from './components/Form';
import { Contacts } from './components/Contacts';
import contactsServices from './services/contacts';

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

  useEffect(() => {
    contactsServices
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])
  console.log('render', persons.length, 'persons')

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

      contactsServices
        .create(newPerson)
    }
  }

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

function setBlankField(name, phone) {
  name('');
  phone('');
}

export default App;
