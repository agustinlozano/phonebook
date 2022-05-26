/* Esta funcion que toma como parametro otra funcion
 * se encarga se setear un nuevo campo del formulario
 * independientemente de cual sea
 */
export const handleInput = (setField) => {
  const handler = (event) => {
    setField(event.target.value)
  }
  return handler
}

export const validate = (name, arr) => {
  const names = arr.map(element => element.name)
  let result;

  (names.includes(name))
    ? result = 'AlreadyAdded'
    : result = name

  return result
}

export const setBlankField = (setName, setPhone) => {
  setName('')
  setPhone('')
}

export const findId = (newPerson, persons) => {
  const isTheContact = persons.find(person =>
    person.name === newPerson.name)

  return isTheContact.id
}

export const showMessage = (setMessage, message) => {
  setMessage(message)
  setTimeout(() => { setMessage(null) }, 5000)
}
