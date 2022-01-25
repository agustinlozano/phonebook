import axios from 'axios'

/* Proviene del deploy de mi API */
const baseURL = '/api/persons'

export const getAll = () => axios.get(baseURL)

export const create = newContact => {
  const request = axios.post(baseURL, newContact)
  return request.then(response => {
    console.log('New contact added: ', response.data)
  })
}

export const getDelete = (id, contact) => {
  const request = axios.delete(`${baseURL}/${id}`, contact)
  return request.then(console.log('Contact list has been updated'))
}

export const update = (id, contact) => {
  const request = axios.put(`${baseURL}/${id}`, contact)
  return request.then(console.log('Contact has been updated'))
}

export default { getAll, create, getDelete, update }