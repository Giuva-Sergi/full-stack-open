const logger = require("./logger");
const unknownEndpoint = function (request, response) {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = function (error, request, response, next) {
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400).send({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected 'username' to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

module.exports = { unknownEndpoint, errorHandler };
