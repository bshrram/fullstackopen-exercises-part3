require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

morgan.token('req-data', req => JSON.stringify(req.body))

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-data'
  )
)

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
  .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const now = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
      <p>${now.toString()}</p>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person)
        response.json(person.toJSON())
      else
        response.status(404).end()
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(result)
      if (result)
        response.status(204).end()
      else
        response.status(404).end()
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  
  const body = request.body
  console.log(body)
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      if (updatedPerson)
        response.json(updatedPerson.toJSON())
      else
        response.status(404).end()
    })
    .catch(err => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
