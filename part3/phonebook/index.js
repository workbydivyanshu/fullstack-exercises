const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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

// Exercise 3.13: GET /api/persons - return all persons from database
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// Exercise 3.18: GET /info - show number of entries and request time (from database)
app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      const info = `
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `
      response.send(info)
    })
    .catch(error => next(error))
})

// Exercise 3.18: GET /api/persons/:id - fetch single person from database
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Exercise 3.15: DELETE /api/persons/:id - delete person from database
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Exercise 3.14: POST /api/persons - add new person to database
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // Validation - name and number are required
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

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

// Exercise 3.17: PUT /api/persons/:id - update a person's number in database
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

// Handle unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Exercise 3.16: Error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
