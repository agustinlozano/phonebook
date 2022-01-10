export const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className="success-message">
      <p>{message}</p>
    </div>
  )
}
