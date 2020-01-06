
const asObject = (text) => {
  return { text }
}

export const updateFilter = (text) => {
  return {
    type: 'UPDATE',
    data: {
      text
    }
  }
}

const initialState = asObject('')

const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'UPDATE': {
      return asObject(action.data.text)
    }
    default:
      return state
  }
}

export default filterReducer