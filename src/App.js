import React, { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import LoginForm from './components/LoginForm'
import { Contacts } from './components/Contacts'
import { Notification } from './components/Notifications'
import { Subtitle } from './components/Subtitle'
import contactServices from './services/contacts'
import { showMessage } from './utils/helper_methods'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [typeNotification, setTypeNotification] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(false)

  /* Otener los datos del el servidor la primera vez */
  useEffect(() => {
    contactServices
      .getAll()
      .then(response => {
        const loggedUserJSON = window.localStorage.getItem('loggedContactAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          contactServices.setToken(user.token)
        }
        setContacts(response.data)
      })
  }, [])

  const addContact = (newContacts, typeNotification, notification) => {
    setContacts(newContacts = contacts)
    setTypeNotification(typeNotification)
    showMessage(setNotification, notification)
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
      <Notification
        message={notification}
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
