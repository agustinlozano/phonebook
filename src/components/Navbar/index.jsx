import './index.css'

const Navbar = () => {
  return (
    <nav>
      {/* <div className='title'>
      </div> */}
      <h1>Wizard<b>'</b>s📔<b>contacts</b></h1>
      <div className='nav-links'>
        <button
          className='login-button'
          href='#'
        >
          Login
        </button>
        <button
          href='#'
          className='register-button'
        >
          Sing Up
        </button>
      </div>
    </nav>
  )
}

export default Navbar
