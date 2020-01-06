import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const newAnecdote = useField('text')

  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log('addAnecdote: ', newAnecdote.value)
    props.createAnecdote(newAnecdote.value)
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

export default connect(
  null,
  { createAnecdote }
)(AnecdoteForm)