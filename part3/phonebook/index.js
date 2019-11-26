
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())

// custom token to return data for POST
morgan.token('data', function getData (req) {
  return req.method === "POST" ? JSON.stringify(req.body) : null
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

let persons = [
  {
  "name": "Arto Hellas",
  "number": "040-123456",
  "id": 1
  },
  {
  "name": "Ada Lovelace",
  "number": "39-44-5323523",
  "id": 2
  },
  {
  "name": "Dan Abramov",
  "number": "12-43-234345",
  "id": 3
  },
  {
  "name": "Mary Poppendieck",
  "number": "39-23-6423122",
  "id": 4
  },
  {
  "name": "Charles Darwin",
  "number": "123123123123",
  "id": 5
  },
  {
  "name": "Batman",
  "number": "123123123",
  "id": 6
  },
  {
  "name": "Superman",
  "number": "91919191",
  "id": 7
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  const timestamp = `${date.toDateString()} ${date.toTimeString()}`
  const info = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${timestamp}</p>
  `
  response.send(info)
})

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(1000));
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  
  // check if name already exists
  if (persons.some(it => it.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
