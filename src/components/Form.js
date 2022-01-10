const Input = ({ field, value, handle }) =>
  <div>{field}
    <input value={value} onChange={handle} />
  </div>

export const Form = ({ handleAddConctact, name, phone, handleName, handlePhone }) => {
  return (
    <form onSubmit={handleAddConctact} >
      <Input
        field='Name'
        value={name}
        handle={handleName}
      />
      <Input
        field='Phone'
        value={phone}
        handle={handlePhone}
      />
      <div>
        <button type="submit" className="add-contact">add</button>
      </div>
    </form>
  );
}