import { useState } from 'react'
import contactServices from '../services/contacts'
import loginService from '../services/login'
import Toggleable from './Toggleable'

const LoginForm = ({ handleUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      contactServices.setToken(user.token)
      handleUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Toggleable buttonLabel='Show login'>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>
          Login
        </button>
      </form>
    </Toggleable>
  )
}

export default LoginForm
