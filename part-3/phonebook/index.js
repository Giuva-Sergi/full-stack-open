const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

morgan.token("content", (req) => {
  if (req.method !== "POST") return;
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["content"](req, res),
    ].join(" ");
  })
);
app.use(cors());

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

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const now = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${now}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.number) {
    res.status(400).json({ error: "Missing content" });
  } else if (persons.some((person) => person.name === req.body.name)) {
    res.status(400).json({ error: "name must be unique" });
  } else {
    const newPerson = {
      id: Math.random() * 10,
      name: req.body.name,
      number: req.body.number,
    };
    persons = [...persons, newPerson];
    res.status(200).send(newPerson);
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
