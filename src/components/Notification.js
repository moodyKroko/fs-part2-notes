const Notification = ({ notifications }) => {
  if (notifications === null) {
    return null
  }

  const { message, type } = notifications

  return <div className={type === 'error' ? 'error' : 'success'}>{message}</div>
}

export default Notification
