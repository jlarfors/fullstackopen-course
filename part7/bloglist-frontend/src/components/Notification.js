
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (!props.notification) {
    return null
  }
  const styleClass = (props.notification.status === 'success') ? 'success-notification' : 'error-notification'
  return (
    <div className={styleClass}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)