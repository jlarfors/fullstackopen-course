
export const showNotification = (message, status, timeout = 10) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: {
        message, status
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, timeout * 1000)
  }
}

const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'SHOW': {
    return action.data
  }
  case 'HIDE': {
    return null
  }
  default:
    return state
  }
}

export default notificationReducer