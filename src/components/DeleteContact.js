export const DeleteContact = ({ handleDelete, person }) => {
  return (
    <button onClick={handleDelete(person)} >
      delete
    </button>
  )
}