import React, { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import LoginForm from './components/LoginForm'
import { Contacts } from './components/Contacts'
import { SuccessNotification } from './components/Notifications'
import { Subtitle } from './components/Subtitle'
import contactServices from './services/contacts'
import { showMessage } from './utils/helper_methods'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [typeNotification, setNotification] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(false)

  /* Otener los datos del el servidor la primera vez */
  useEffect(() => {
    contactServices
      .getAll()
      .then(response => setContacts(response.data))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedContactAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      contactServices.setToken(user.token)
    }
  }, [])

  const addContact = (newContacts, typeNotification, message) => {
    setContacts(newContacts = contacts)
    setNotification(typeNotification)
    showMessage(setMessage, message)
  }

  /* Eliminar un contacto de la lista */
  const handleDelete = contact => {
    const handler = () => {
      const result = window.confirm(`Do you want to remove ${contact.name} from the list?`)
      if (result) {
        const newContacts = contacts.filter(person => person.id !== contact.id)
        setContacts(newContacts)

        /* Actualizar los datos en el servidor */
        contactServices
          .getDelete(contact.id, contact)
      }
    }
    return handler
  }

  const handleLogout = () => {
    setUser(null)
    contactServices.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return (
    <div>
      <h1>Wizard's Contacts</h1>
      <SuccessNotification
        message={message}
        type={typeNotification}
      />
      {
        user
          ? <ContactForm
              contacts={contacts}
              addContact={addContact}
              handleLogout={handleLogout}
            />
          : <LoginForm
              handleUser={setUser}
            />
      }
      <Subtitle content='Contacts list' />
      <Contacts
        contacts={contacts}
        deletePerson={handleDelete}
      />
    </div>
  )
}

export default App
