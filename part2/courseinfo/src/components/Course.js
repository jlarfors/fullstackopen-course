
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

const Sum = ({parts}) => {
    console.log(parts)
    const sum = parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <div>
            <p><b>total of {sum} exercises</b></p>
        </div>
    )
}

const Course = ({course}) => (
    <div>
        <h2>{course.name}</h2>
        <Content parts={course.parts} />
        <Sum parts={course.parts} />
    </div>
)

export default Course