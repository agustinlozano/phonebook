const UserField = ({ field, value, handle, placeholder }) =>
  <div>
    {field}
    <input
      value={value}
      onChange={handle}
      placeholder={placeholder}
    />
  </div>

export default UserField
