
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const NextAnecdoteButton = ({onClick, text}) => (
    <div>
        <button onClick={onClick}>{text}</button>
    </div>
)

const AnecdoteOfTheDay = ({anecdote, nextAnecdote, voteAnecdote}) => {
    let mostVotesIndex = anecdote.votes.indexOf(Math.max(...anecdote.votes));
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[anecdote.selected]}</p>
            <p>has {anecdote.votes[anecdote.selected]} votes</p>
            <NextAnecdoteButton onClick={() => nextAnecdote()} text="next anecdote" />
            <NextAnecdoteButton onClick={() => voteAnecdote()} text="vote" />
        </div>
    )
}

const AnecdoteMostVotes = ({anecdote}) => {
    let mostVotesIndex = anecdote.votes.indexOf(Math.max(...anecdote.votes));
    return (
        <div>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[mostVotesIndex]}</p>
        </div>
    )
}

const App = ({anecdotes}) => {
    // state to store the anecdotes and votes
    const [anecdote, setAnecdote] = useState({
        selected: 0,
        total: anecdotes.length,
        votes: new Array(anecdotes.length).fill(0)
    })
    
    const voteAnecdote = () => {
        const copy = {... anecdote}
        copy.votes[copy.selected] += 1
        setAnecdote(copy)
    }

    const nextAnecdote = () => {
        const copy = {... anecdote}
        copy.selected +=1
        if (anecdote.selected == (anecdote.total - 1)) {
            copy.selected = 0
        }
        setAnecdote(copy)
    }

    return (
        <div>       
            <AnecdoteOfTheDay anecdote={anecdote} voteAnecdote={voteAnecdote} nextAnecdote={nextAnecdote} />
            <AnecdoteMostVotes anecdote={anecdote} />
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
