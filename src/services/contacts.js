import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL)

const create = newContact => {
  const request = axios.post(baseURL, newContact)
  return request.then(response => {
    console.log('New contact added: ', response.data)
  })
}

const getDelete = (id, person) => {
  const request = axios.delete(`${baseURL}/${id}`, person)
  return request.then(response => 
    console.log('Contact list has been updated')
  )
}

export default { getAll, create, getDelete }