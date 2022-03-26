import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Contacts } from './Contacts'
import { contactList } from '../utils/helper_test.js'

describe(('<Contacts />'), () => {
  let component

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
