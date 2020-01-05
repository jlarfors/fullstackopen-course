import React from 'react'
import { useField } from '../hooks'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const newAnecdote = useField('text')

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('addAnecdote: ', newAnecdote.value)
    props.store.dispatch(createAnecdote(newAnecdote.value))
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div><input {...newAnecdote} /></div>
        <button onClick={addAnecdote}>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm