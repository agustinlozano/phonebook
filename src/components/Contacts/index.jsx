import React from 'react'
import Contact from '../Contact/index.jsx'
import './index.css'

export default function Contacts () {
  return (
    <div className='contacts'>
      <h2>My Contacts</h2>
      <Contact
        name='Agustin'
        phoneNumber='2477 - 635371'
        emailAddress='agustinlozanoblua@gmail.com'
      />
    </div>
  )
}
