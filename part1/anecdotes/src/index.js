import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayAnecdote = ({anecdotes,points}) => {
  const mostVoted = points.indexOf(Math.max(...points));
  if (Math.max(...points) === 0){
    return(
      <div>
        <h2>No votes yet</h2>
      </div>
    )
  }
  return (
    <div>
      <h2>Most Voted Anecdote is:</h2>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
  const handleNextClick = (anecdotes) => () => {
    setSelected(Math.floor((Math.random()*anecdotes.length)))
  }
  
  const handleVoteClick = (selected) => () => {
    const newPoints = [...points]
    newPoints[selected] +=1
    setPoints(newPoints)
  }
  
  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>Votes: {points[selected]}</p>
      <Button onClick={handleVoteClick(selected)} text="vote"/>
      <Button onClick={handleNextClick(anecdotes)} text="next anecdote"/>
      <DisplayAnecdote anecdotes={anecdotes} points ={points} />
    </div>
  )
}

const anecdotes = [
  'The best way to get a project done faster is to start sooner',
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

