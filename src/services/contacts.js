import axios from 'axios'

/* Proviene del deploy de mi API */
const baseURL = 'http://localhost:3001/api/persons'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => axios.get(baseURL)

const create = newContact => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseURL, newContact, config)

  return request.then(response => {
    console.log('New contact added: ', response.data)
  })
}

const getDelete = (id, contact) => {
  const request = axios.delete(`${baseURL}/${id}`, contact)
  return request.then(console.log('Contact list has been updated'))
}

const update = (id, contact) => {
  const request = axios.put(`${baseURL}/${id}`, contact)
  return request.then(console.log('Contact has been updated'))
}

export default { getAll, create, getDelete, update, setToken }
