import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (props.notification.visible) {
    return (
      <div style={style}>
        {props.notification.message}
      </div>
    )
  } else {
    return ''
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification, 
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)