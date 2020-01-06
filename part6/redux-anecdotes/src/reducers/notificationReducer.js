
const asObject = (message, visible = true) => {
  return {
    message,
    visible
  }
}

export const showNotification = (message, timeout = 10) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      data: {
        message
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, timeout * 1000)
  }
}

export const hideNotification = (message) => {
  return {
    type: 'HIDE',
  }
}

const initialState = asObject('', false)

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SHOW': {
      return asObject(action.data.message)
    }
    case 'HIDE': {
      return asObject('', false)
    }
    default:
      return state
  }
}

export default notificationReducer