import React from 'react'
const Notification = ({ message, errorState }) => {
  const notificationStyle = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  notificationStyle.color = errorState ? 'red' : 'green'
  if (message === null) {
    return null
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
