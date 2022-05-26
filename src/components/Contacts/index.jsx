import Contact from '../Contact/index.jsx'
import './index.css'

export default function Contacts ({ contacts, deletePerson }) {
  return (
    <div className='contacts'>
      <h2>My Contacts</h2>
      {contacts.map(person =>
        <Contact
          key={person.name}
          name={person.name}
          phoneNumber={person.phone}
          emailAddress='agustinlozanoblua@gmail.com'
        />
      )}
    </div>
  )
}
