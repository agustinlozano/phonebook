import React, { useState, useEffect } from 'react';
import { Form } from './components/Form';
import { Contacts } from './components/Contacts';
import contactsServices from './services/contacts';

const H2 = ({ content }) =>
  <h2>{content}</h2>

const App = () => {
  const [contacts, setContacts] = useState([
    {
      name: 'Arto Hellas',
      phone: 2477345212
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  /* Otener los datos del el servidor la primera vez */
  useEffect(() => {
    contactsServices
    .getAll()
    .then(response => setContacts(response.data))
  }, [])

  /* Agregar un nuevo contacto a la lista */
  const handleAddContact = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      phone: newPhone
    };

    if (validate(newName, contacts) === '') {
      const result = window.confirm(
        `${newName} is alreay added to phonebook, replace the old number with a new one?`)
      if (result) {
        const newContacts = contacts.concat(newContact);
        setContacts(newContacts)
        setBlankField(setNewName, setNewPhone)
        
        /* Reemplazar los los datos del contacto en el servidor */
        const ID = findID(newContact, contacts)
        contactsServices
          .update(ID, newContact)

      } else {
        setBlankField(setNewName, setNewPhone);
      }

    } else {
      const newContacts = contacts.concat(newContact);
      setContacts(newContacts)
      setBlankField(setNewName, setNewPhone);
      
      /* Alterar los datos en el servidor */
      contactsServices
        .create(newContact)
    }
  }

  /* Eliminar un contacto de la lista */
  const handleDelete = contact => {
    const handler = () => {
      const result = window.confirm(`Do you want to remove ${contact.name} from the list?`)
      if (result) {
        const newContacts = contacts.filter(person => person.id !== contact.id)
        setContacts(newContacts)
        
        /* Actualizar los datos en el servidor */
        contactsServices
          .getDelete(contact.id, contact)
      }
    }
    return handler
  }

  return (
    <div>
      <H2 content='Phonebook' />
      <Form
        handleAddConctact={handleAddContact}
        name={newName}
        phone={newPhone}
        handleName={handleInput(setNewName)}
        handlePhone={handleInput(setNewPhone)}
      />
      <H2 content='Numbers' />
      <Contacts 
        contacts={contacts} 
        deletePerson={handleDelete}
      />
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

function findID(newPerson, persons) {
  const isTheContact = persons.find(person =>
    person.name === newPerson.name)

  return isTheContact.id
}

export default App;
