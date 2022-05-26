import { useEffect, useState } from 'react'
import Contacts from './Contacts'
import ContactForm from './ContactForm'
import Notification from './Notification'

import contactServices from '../services/contacts.js'
import { showMessage } from '../utils/helper_methods'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [typeNotification, setTypeNotification] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(false)

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

  const handleLogout = () => {
    setUser(null)
    contactServices.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return (
    <>
      {
      user
        ? (
          <>
            <p>`Hola ${user}`</p>
            <ContactForm
              contacts={contacts}
              addContact={addContact}
              handleLogout={handleLogout}
            />
          </>
          )
        : <p>Hola Anonimo ^^</p>
      }
      <Notification
        message={notification}
        type={typeNotification}
      />
      <Contacts
        contacts={contacts}
      />
    </>
  )
}

export default App
