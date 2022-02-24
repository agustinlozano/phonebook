import { DeleteContact } from './DeleteContact'

export const Contacts = ({ contacts, deletePerson }) => {
  return (
    <div>
      <ol>
        {contacts.map(person =>
          <li key={person.name}>
            <strong>Contact: </strong>
            {person.name}
            <strong>&nbsp;Phone: </strong>
            {person.phone}
            <br />
            <DeleteContact
              handle={deletePerson}
              person={person}
            />
          </li>
        )}
      </ol>
    </div>
  )
}
