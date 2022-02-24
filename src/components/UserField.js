const UserField = ({ field, value, handle }) =>
  <div>
    {field}
    <input value={value} onChange={handle} />
  </div>

export default UserField
