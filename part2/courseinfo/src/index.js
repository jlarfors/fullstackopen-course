
import React from 'react';
import ReactDOM from 'react-dom';

const Part = ({name, exercises}) => (
    <div>
        <p>{name} {exercises}</p>
    </div>
)

const Content = ({parts}) => {
    parts = parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
    return (
        <div>
            {parts}
        </div>
    )
}

const Header = ({text}) => (
    <div>
        <h1>{text}</h1>
    </div>
)

const Sum = ({parts}) => {
    console.log(parts)
    const sum = parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <div>
            <p>{sum}</p>
        </div>
    )
}

const Course = ({course}) => (
    <div>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Sum parts={course.parts} />
    </div>
)

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

