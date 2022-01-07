import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL)

const create = newContact => {
  const request = axios.post(baseURL, newContact)
  return request.then(response => {
    console.log('New contact added: ', response.data)
  })
}

export default { getAll, create }