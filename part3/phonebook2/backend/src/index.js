const http = require("http");
const express = require("express");
const { request, response } = require("express");
const morgan = require('morgan')
const app = express();

morgan.token('body', function (req) { return JSON.stringify(req.body) })


app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

const checkName = (name) => {
  const match = persons.find((person) => person.name === name);
  if (!match) return false;
  return true;
};

app.get("/info", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end(
    Buffer.from(`
  <p>PhoneBook has infor for ${persons.length} people</p>
  <p>${new Date()}</p>
  `)
  );
});

app.get("/api/persons", (request, response) => {
  //console.log(persons);
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    return response.json(person);
  } else {
    return response.status(404).end("Person not found");
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  if (checkName(body.name)){
      return response.status(400).json({error:'Name must be unique'})
  }
  const id = generateId();
  const newPerson = {
    id: id,
    name: body.name,
    number: body.number,
    date: new Date(),
  };
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});
