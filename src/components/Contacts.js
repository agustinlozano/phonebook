import { DeleteContact } from "./DeleteContact";

export const Contacts = ({ persons, deletePerson }) => {
  return (
    <div>
      <ol>
        {persons.map((person) =>
          <li key={person.name}>
            {
              `contact: ${person.name},
              phone: ${person.phone}`
            }
            <DeleteContact 
              handleDelete={deletePerson}
              person={person}
            />
          </li>
        )}
      </ol>
    </div>
  );
}