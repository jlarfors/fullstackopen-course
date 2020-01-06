import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    props.voteAnecdote(anecdote)
    props.showNotification(`you voted '${anecdote.content}'`, 10)
  }

  return (
    <div>
      {props.visibleAnecdotes
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}



const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes
    .filter(anecdote => filter.text ? anecdote.content.includes(filter.text) : true)
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state), 
  }
}

const mapDispatchToProps = {
  showNotification,
  hideNotification,
  voteAnecdote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
