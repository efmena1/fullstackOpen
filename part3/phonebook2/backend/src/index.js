require("dotenv").config();
const express = require("express");
const { request, response, query } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

morgan.token("body", function (req) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const checkName = (name) => {
  Person.findOne({ name: name })
    .then((result) => {
      if (result === null) return false;
      return true;
    })
    .catch((error) => next(error));
};

app.get("/info", (request, response) => {
  Person.count({})
    .then((result) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(
        Buffer.from(`
  <p>PhoneBook has info for ${result} people</p>
  <p>${new Date()}</p>
  `)
      );
    })
    .catch((error) => next(error));
});

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
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
  if (checkName(body.name)) {
    return response.status(400).json({ error: "Name must be unique" });
  }
  const newPerson = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });
  console.log(newPerson);
  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response) => {
  const newNumber = {
    number: request.body.number,
  };
  Person.findByIdAndUpdate(request.params.id, newNumber, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((resutl) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
