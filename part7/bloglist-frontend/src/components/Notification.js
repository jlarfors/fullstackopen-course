
import { Message } from 'semantic-ui-react'
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (!props.notification) {
    return null
  }
  // const styleClass = (props.notification.status === 'success') ? 'success-notification' : 'error-notification'
  if (props.notification.status === 'success') {
    return (
      <Message success>
        <p>{props.notification.message}</p>
      </Message>
    )
  } else {
    return (
      <Message error>
        <p>{props.notification.message}</p>
      </Message>
    )
  }
  // return (
  //   // <div className={styleClass}>
  //   //   {props.notification.message}
  //   // </div>
  //   <Message {props.notification.status}>
  //     <p>{props.notification.message}</p>
  //   </Message>
  // )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)