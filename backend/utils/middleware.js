const unknownEndpoint = function (request, response) {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = function (error, request, response, next) {
  error(error);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = { unknownEndpoint, errorHandler };
