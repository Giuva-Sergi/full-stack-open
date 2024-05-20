require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Note = require("./models/note");

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.send("<h1>Yes, nodemon is working!!!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

app.get("/api/notes/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

app.post("/api/notes", (req, res, next) => {
  const body = req.body;

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  note
    .save()
    .then((savedNote) => res.json(savedNote))
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (req, res, next) => {
  const { content, important } = req.body;
  const note = {
    content,
    important,
  };

  Note.findByIdAndUpdate(req.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => res.status(201).json(updatedNote))
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

const unknownEndpoint = function (request, response) {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = function (error, request, response, next) {
  console.error(error);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
