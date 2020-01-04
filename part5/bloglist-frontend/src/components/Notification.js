import React from 'react'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }
  const styleClass = (notification.status === 'success') ? 'success-notification' : 'error-notification'
  return (
    <div className={styleClass}>
      {notification.message}
    </div>
  )
}

export default Notification