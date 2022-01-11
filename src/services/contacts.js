import axios from 'axios'
const baseURL = 'https://protected-tor-63201.herokuapp.com/api/persons'

const getAll = () => axios.get(baseURL)

const create = newContact => {
  const request = axios.post(baseURL, newContact)
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

export default { getAll, create, getDelete, update }