export const DeleteContact = ({ handle, person }) => {
  return (
    <button onClick={handle(person)} >
      delete
    </button>
  )
}