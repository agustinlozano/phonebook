import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import ContactForm from './ContactForm'
import { contactList } from '../utils/helper_test'

describe('<ContactForm />', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <ContactForm
        contacts={contactList}
        addContact={() => {}}
        handleLogout={mockHandler}
      />
    )
  })

  test('renders the right content', () => {
    component.getByText('Name')
    component.getByText('Phone')
    component.getByText('add')
    component.getByText('logout')
    component.getByText('Cancel')
  })

  test('the inputs can be typed', () => {
    const nameField = component.getByPlaceholderText('name')
    const phoneField = component.getByPlaceholderText('phone')
    const form = component.container.querySelector('form')

    fireEvent.change(nameField, {
      target: { value: 'Cato Lozano Blua' }
    })

    fireEvent.change(phoneField, {
      target: { value: '2477 - 444740' }
    })

    expect(nameField.value).toBe('Cato Lozano Blua')
    expect(phoneField.value).toBe('2477 - 444740')

    fireEvent.submit(form)
  })

  test('after clicking the logout button logout handler is called once', () => {
    const logout = component.getByText('logout')

    fireEvent.click(logout)

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
