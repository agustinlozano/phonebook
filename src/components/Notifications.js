export const SuccessNotification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      <p>{message}</p>
    </div>
  )
}
