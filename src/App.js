import React, { useState, useEffect } from 'react'
import { Form } from './components/Form'
import { Contacts } from './components/Contacts'
import { SuccessNotification } from './components/Notifications'
import contactsServices from './services/contacts'

const H2 = ({ content }) =>
  <h2>{content}</h2>

const App = () => {
  const [contacts, setContacts] = useState([
    {
      name: 'Arto Hellas',
      phone: 2477345212
    }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [typeNotification, setNotification] = useState('')
  const [message, setMessage] = useState(null)

  /* Otener los datos del el servidor la primera vez */
  useEffect(() => {
    contactsServices
    .getAll()
    .then(response => setContacts(response.data))
  }, [])

  /* Agregar un nuevo contacto a la lista */
  const handleAddContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      phone: newPhone
    }

    const result = validate(newName, contacts)

    if (result === 'AlreadyAdded') {
      const choice = window.confirm(
        `${newName} is alreay added to phonebook, replace the old number with a new one?`)
      if (choice) {
        const newContacts = contacts.concat(newContact)
        const message = `'${newName}' has been updated`

        setContacts(newContacts)
        setNotification('success-message')
        showMessage(setMessage, message)
        
        /* Reemplazar los los datos del contacto en el servidor */
        const ID = findID(newContact, contacts)
        contactsServices
          .update(ID, newContact)
          .catch(error => {
            const errorMessage = 'Error: contact could\'t be update'
            setNotification('failure-message')
            showMessage(setMessage, errorMessage)
            console.log(error)
          })
      }
      setBlankField(setNewName, setNewPhone)

    } else {
      /* Alterar los datos en el servidor */
      contactsServices
        .create(newContact)
        .then(async newContact => {
          const newContacts = contacts.concat(newContact)
          const message = `'${newName}' has been added`
          
          await setContacts(newContacts)
          await setNotification('success-message')
          await showMessage(setMessage, message)
          await setBlankField(setNewName, setNewPhone)
        })
        .catch(error => {
          /* access the error message */
          const message = error.response.data.error
          setNotification('failure-message')
          showMessage(setMessage, message)
          setBlankField(setNewName, setNewPhone)
          console.log(error.response.data)
        })
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
      <H2 content="Wizard's Contacts" />
      <SuccessNotification 
        message={message} 
        type={typeNotification}
      />
      <Form
        handleAddConctact={handleAddContact}
        name={newName}
        phone={newPhone}
        handleName={handleInput(setNewName)}
        handlePhone={handleInput(setNewPhone)}
      />
      <H2 content='Contacts list' />
      <Contacts 
        contacts={contacts} 
        deletePerson={handleDelete}
      />
    </div>
  )
}

/* Funciones de las cuales depende la app */

/* Esta funcion que toma como parametro otra funcion
 * se encarga se setear un nuevo campo del formulario
 * independientemente de cual sea
 */
const handleInput = (setField) => {
  const handler = (event) => {
    setField(event.target.value)
  }
  return handler
}

function validate(name, arr) {
  const names = arr.map(element => element.name)
  let result;
  
  (names.includes(name))
    ? result = 'AlreadyAdded'
    : result = name

  return result
}


function setBlankField(setName, setPhone) {
  setName('')
  setPhone('')
}

function findID(newPerson, persons) {
  const isTheContact = persons.find(person =>
    person.name === newPerson.name)

  return isTheContact.id
}

function showMessage(setMessage, message) {
  setMessage(message)
  setTimeout(() => { setMessage(null) }, 5000)
}

export default App
