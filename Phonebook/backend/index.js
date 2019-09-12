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

/*let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
]

const generateId = max => {
  return Math.floor(Math.random() * Math.floor(max))
}*/

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    console.log("error")
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  /*const p = persons.find(person => person.name === body.name)
  if (p) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }*/

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
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

app.get('/api/persons/:id', (request, response) => {
  //const id = Number(request.params.id)
  Person.findById(request.params.id).then(person => {
    response.json(person.toJSON())
  })
  /*const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }*/
})

app.delete('/api/persons/:id', (request, response) => {
  //const id = Number(request.params.id)
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
  /*
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()*/
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
