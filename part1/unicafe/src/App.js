import React, { useState } from 'react'

const Button = ({onClick, name}) => (
  <button onClick = {onClick}>{name}</button>
)

const Display = ({name, object}) => {return <div> {name} {object}</div>}

const Statistics = ({good, neutral, bad}) => {
  const average = ((good + bad + neutral) == 0) ? 0: (good - bad)/(good + bad + neutral)
  const positive = ((good + bad + neutral) == 0) ? "0%": good/(good + bad + neutral) * 100 + "%"
  if ((good + neutral + bad) == 0) {
    return "No feedback given"
  }
  return (
  <div>
    <table>
      <tbody>
        <tr>
          <td> good </td>
          <td> {good}</td>
        </tr>
        <tr>
          <td> neutral </td>
          <td>{neutral} </td>
        </tr>
        <tr>
          <td> bad </td>
          <td>{bad} </td>
        </tr>
        <tr>
          <td> all </td>
          <td>{good + neutral + bad} </td>
        </tr>
        <tr>
          <td> average</td>
          <td> {average}</td>
        </tr>
        <tr>
          <td> positive</td>
          <td> {positive} </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

const StatisticLine = ({text, value}) => <div>{text} {value}</div>

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text = "give feedback"/>
      <Button 
        onClick = {() => setGood(good+1)} 
        name = "good"
      />

      <Button 
        onClick = {() => setNeutral(neutral+1)} 
        name = "neutral"
      />  

      <Button 
        onClick = {() => setBad(bad+1)} 
        name = "bad"
      />

      <Header text = "statistics"/>

      <Statistics
        good = {good}
        bad = {bad}
        neutral = {neutral}
      />
    </div>
  )
}

export default App