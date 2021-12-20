export const Contacts = ({ persons }) => {
  return (
    <div>
      <ol>
        {persons.map((person) =>
          <li key={person.name}>
            {
              `contact: ${person.name},
              phone: ${person.phone}`
            }
          </li>
        )}
      </ol>
    </div>
  );
}