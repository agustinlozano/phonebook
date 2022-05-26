import { useState } from 'react'

const Toggleable = ({ children, buttonLabel, className }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div className={className}>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default Toggleable
