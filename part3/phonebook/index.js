const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

// Middleware
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// Exercise 3.8: Create custom morgan token for request body
morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

// Exercise 3.7 & 3.8: Morgan logging with custom format for POST data
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Hardcoded phonebook data
let persons = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

// Exercise 3.1: GET /api/persons - return all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Exercise 3.2: GET /info - show number of entries and request time
app.get('/info', (request, response) => {
  const info = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `
  response.send(info)
})

// Exercise 3.3: GET /api/persons/:id - fetch single person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Exercise 3.4: DELETE /api/persons/:id - delete single person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  
  response.status(204).end()
})

// Exercise 3.5: Generate random ID for new persons
const generateId = () => {
  const maxId = Math.floor(Math.random() * 1000000)
  return String(maxId)
}

// Exercise 3.5 & 3.6: POST /api/persons - add new person with validation
app.post('/api/persons', (request, response) => {
  const body = request.body

  // Exercise 3.6: Validation - name and number are required
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  // Exercise 3.6: Check if name already exists
  const existingPerson = persons.find(p => p.name === body.name)
  if (existingPerson) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})

// PUT /api/persons/:id - update a person's number
app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const body = request.body

  const person = persons.find(p => p.id === id)
  
  if (!person) {
    return response.status(404).json({ error: 'person not found' })
  }

  const updatedPerson = {
    ...person,
    number: body.number
  }

  persons = persons.map(p => p.id === id ? updatedPerson : p)
  response.json(updatedPerson)
})

// Handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
