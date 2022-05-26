import { useState } from 'react'
import Toggleable from '../Toggleable'
import UserField from '../UserField'
import contactsServices from '../../services/contacts'
import {
  handleInput, validate, setBlankField, findId
} from '../../utils/helper_methods'
import './index.css'

const ContactForm = ({ contacts, addContact, handleLogout }) => {
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  /* Agregar un nuevo contacto a la lista */
  const handleContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      phone: newPhone
    }

    if (validate(newName, contacts) === 'AlreadyAdded') {
      const choice = window.confirm(
        `${newName} is alreay added to phonebook, replace the old number with a new one?`)

      if (choice) {
        /* Reemplazar los los datos del contacto en el servidor */
        const ID = findId(newContact, contacts)

        contactsServices
          .update(ID, newContact)
          .then(() => {
            const newContacts = contacts.concat(newContact)
            const message = `'${newName}' has been updated`

            addContact(newContacts, 'success-message', message)
          })
          .catch(error => {
            const errorMessage = error.response.data

            addContact(undefined, 'failure-message', errorMessage)
          })
      }
      setBlankField(setNewName, setNewPhone)
    } else {
      /* Alterar los datos en el servidor */
      contactsServices
        .create(newContact)
        .then(() => {
          const newContacts = contacts.concat(newContact)
          const message = `'${newName}' has been added`

          addContact(newContacts, 'success-message', message)
        })
        .catch(error => {
          /* access the error message */
          const message = error.response.data

          addContact(undefined, 'failure-message', message.error)
        })
      setBlankField(setNewName, setNewPhone)
    }
  }

  return (
    <Toggleable
      buttonLabel='New contact'
      className='contact-form'
    >
      <form onSubmit={handleContact}>
        <UserField
          field='Name'
          value={newName}
          handle={handleInput(setNewName)}
        />
        <UserField
          field='Phone'
          value={newPhone}
          handle={handleInput(setNewPhone)}
        />
        <div>
          <button type='submit' className='add-contact'>add</button>
        </div>
      </form>
      <div>
        <button onClick={handleLogout}>
          logout
        </button>
      </div>
    </Toggleable>
  )
}

export default ContactForm
