import { DeleteContact } from "./DeleteContact";

export const Contacts = ({ contacts, deletePerson }) => {
  return (
    <div>
      <ol>
        {contacts.map(person =>
          <li key={person.name}>
            {
              `contact: ${person.name},
              phone: ${person.phone}`
            }
            <DeleteContact 
              handle={deletePerson}
              person={person}
            />
          </li>
        )}
      </ol>
    </div>
  );
}