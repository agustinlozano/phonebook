import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const hadlePerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    const newPersons = persons.concat(newPerson);
    setPersons(newPersons);
    setNewName('');
  }
  
  const handleName = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={hadlePerson}>
        <div>name: 
          <input 
            value={newName}
            onChange={handleName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ol>
          {persons.map((person) => 
            <li key={person.name}>
              contact: {person.name}
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}

export default App;