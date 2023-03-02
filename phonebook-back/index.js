const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))
//cambiar
let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const Phone = require("./models/phone")

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
  Phone.find({})
    .then(
      phones => response.json(phones))
})

app.get('/api/persons/:id', (request, response) => {
  //const id = request.params.id
  const id = '63f5044621791d7e2806e98e'
  Phone.findById(id)
    .then(
      person => response.json(person)
    )
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  Phone.deleteOne({_id: id})
    .then(
      res => response.status(204).end()
    )
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  const person = new Phone({
    number: body.number,
    name: body.name,
  })

  person.save()
    .then(
      savedPerson => response.json(savedPerson)
    )
})

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateId = () => {
  const min = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
  return getRandomNumber(min, 1000)
}

app.get("/info", (request, response) => {
  const string =
    `Phonebook has info for ${persons.length} people\n ${new Date()}
        `
  console.log(string)
  response.send(string)
})

app.get(["/", "/:name"], (req, res) => {
  greeting = "<h1>Hello From Node on Fly!</h1>";
  name = req.params["name"];
  if (name) {
    res.send(greeting + "</br>and hello to " + name);
  } else {
    res.send(greeting);
  }
});

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})