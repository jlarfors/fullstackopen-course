
import anecdoteServices from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    console.log('voted: ', {...anecdote, votes: anecdote.votes + 1})
    const updatedAnecdote = await anecdoteServices.update({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: {
        anecdote: updatedAnecdote
      }
    })
  }
  // return {
  //   type: 'VOTE',
  //   data: {
  //     id: id
  //   }
  // }
}

export const createAnecdote = (newAnecdote) => {
  return async dispatch => {
    const anecdote = await anecdoteServices.createNew(asObject(newAnecdote))
    dispatch({
      type: 'ADD',
      data: anecdote
    })
  }
}

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'VOTE': {
      const copy = [...state]
      return copy.map(
        item => item.id === action.data.anecdote.id ? action.data.anecdote : item
      )
    }
    case 'ADD': {
      return state.concat(action.data)
    }
    default:
      return state
  }
}

export default anecdoteReducer