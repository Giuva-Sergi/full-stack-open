const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Contact = require("./models/contact");

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
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("<h1>App is running</h1>");
});

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((contacts) => res.json(contacts));
});

app.get("/info", (req, res) => {
  const now = new Date();
  Contact.find({}).then((contacts) => {
    res.send(
      `<p>Phonebook has info for ${contacts.length} people</p><p>${now}</p>`
    );
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      if (contact) {
        res.json(contact);
      } else {
        res.status(404).send({ error: "person not found" });
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res) => {
  if (!req.body.name || !req.body.number) {
    res.status(400).json({ error: "Missing content" });
  } else {
    const newContact = new Contact({
      name: req.body.name,
      number: req.body.number,
    });
    newContact
      .save()
      .then((savedContact) => res.status(201).json(savedContact));
  }
});

app.put("/api/persons/:id", (req, res, next) => {
  const contact = {
    name: req.body.name,
    number: req.body.number,
  };

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
    .then((updatedContact) => res.status(201).send(updatedContact))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

const errorHandler = function (error, request, response, next) {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const generalErrorHandler = function (error, request, response, next) {
  return response.status(500).send({ error: "internal server error" });
};

app.use(errorHandler);
app.use(generalErrorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
