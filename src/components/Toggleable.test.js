import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Toggleable from './Toggleable'

describe('<Toggleable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Toggleable buttonLabel='show'>
        <div className='testDiv'>test div content</div>
      </Toggleable>
    )
  })

  test('renders its children', () => {
    component.getByText('test div content')
  })

  test('at start the children are not displayed', () => {
    const childrenElm = component.getByText('test div content')

    expect(childrenElm.parentNode).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const childrenElm = component.getByText('test div content')
    expect(childrenElm.parentNode).not.toHaveStyle('display: none')
  })
})
