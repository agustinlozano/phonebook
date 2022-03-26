import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Contacts } from './Contacts'

describe(('<Contacts />'), () => {
  let component
  const contactList = [
    {
      name: 'Arto Hellas',
      phone: '040-123456',
      id: 1
    },
    {
      name: 'Ada Lovelace',
      phone: '39-44-5323523',
      id: 2
    },
    {
      name: 'Dan Abramov',
      phone: '12-43-234345',
      id: 3
    },
    {
      name: 'Mary Poppendieck',
      phone: '39-23-6423122',
      id: 4
    }
  ]

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Contacts
        contacts={contactList}
        deletePerson={mockHandler}
      />
    )
  })

  test('renders content', () => {
    const renderedcontacts = component.container.querySelectorAll('li')

    expect(renderedcontacts).toHaveLength(contactList.length)
    expect(mockHandler.mock.calls).toHaveLength(contactList.length)
  })
})
