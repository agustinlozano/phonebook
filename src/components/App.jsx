import { useEffect, useState } from 'react'
import Contacts from './Contacts'
import contactServices from '../services/contacts.js'

const App = () => {
  const [contacts, setContacts] = useState([])
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

  return (
    <>
      {
      user
        ? <p>`Hola ${user}`</p>
        : <p>Hola Anonimo ^^</p>
      }
      <Contacts
        contacts={contacts}
      />
    </>
  )
}

export default App
