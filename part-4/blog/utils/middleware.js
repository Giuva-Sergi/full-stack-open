const errorHandler = function (error, request, response, next) {
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400).send({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    response.status(400).send({ error: "expected `username` to be unique" });
  }
  next(error);
};

module.exports = errorHandler;
