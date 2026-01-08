const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const className = message.type === 'success' ? 'success' : 'error'

  const style = {
    color: message.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style} className={className}>
      {message.text}
    </div>
  )
}

export default Notification
