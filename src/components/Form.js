const Input = ({ field, value, handle }) =>
  <div>{field}
    <input value={value} onChange={handle} />
  </div>

export const Form = ({ handlePerson, name, phone, handleName, handlePhone }) => {
  return (
    <form onSubmit={handlePerson} >
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
        <button type="submit">add</button>
      </div>
    </form>
  );
}