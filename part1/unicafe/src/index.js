
import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const FeebackButton = (props) => (
    <button onClick={props.onClick}>{props.text}</button>
)

const Statistic = (props) => (
    <tr>
        <th>{props.text}</th>
        <th>{props.value}</th>
    </tr>
)

const Statistics = (props) => {
    let total = props.good + props.neutral + props.bad
    if (total == 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <table>
                    <Statistic text="good" value={props.good} />
                    <Statistic text="neutral" value={props.neutral} />
                    <Statistic text="bad" value={props.bad} />
                    <Statistic text="all" value={total} />
                    <Statistic text="average" value={(props.good - props.bad) / total} />
                    <Statistic text="positive" value={(props.good * 100) / (total)} />
                </table>
            </div>
        )
    }
}

const Feedback = () => (
    <div>
        <h1>give feedback</h1>
        <FeebackButton onClick={() => console.log("Button")} text="good" />
        <FeebackButton onClick={() => console.log("Button")} text="neutral" />
        <FeebackButton onClick={() => console.log("Button")} text="bad" />
    </div>
)

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
    <div>
        <h1>give feedback</h1>
        <FeebackButton onClick={() => setGood(good + 1)} text="good" />
        <FeebackButton onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <FeebackButton onClick={() => setBad(bad + 1)} text="bad" />

        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
