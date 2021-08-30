import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({content}) =>{
  return (
    <div>
      <h1>{content}</h1>
    </div>
  )
}

const Button = ({handleClick,text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text,value}) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Statistics = ({good,bad,neutral}) =>{
  const totalVotes = good + bad + neutral
  const average = ((good*1)+(bad*-1))/totalVotes  
  const positive = (good/totalVotes)*100
  if (totalVotes===0){
    return(
      <div>
      <h2>Statistics</h2>
      <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statistics</h2>
      <StatisticLine text="Good: " value={good} />
      <StatisticLine text="Neutral: " value={neutral} />
      <StatisticLine text="Bad: " value={bad} />
      <StatisticLine text="Average: " value={average} />
      <StatisticLine text="Positive (%): " value={positive} />
    </div>
  )
}

const App = () => {
  const header = 'Give us Feedback'
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const voteGood = () => setGood(good+1)
  const voteNeutral = () => setNeutral(neutral+1)
  const voteBad = () => setBad(bad+1)
  console.log(good,neutral,bad)
  return (
    <div>
      <Header content ={header}/>
      <Button
        handleClick={voteGood}
        text='good'
      />
      <Button
        handleClick={voteNeutral}
        text='neutral'
      />
      <Button
        handleClick={voteBad}
        text='bad'
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)