
const asObject = (message, visible = true) => {
  return {
    message,
    visible
  }
}

export const showNotification = (message) => {
  return {
    type: 'SHOW',
    data: {
      message
    }
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