const User = require("../models/user");
const jwt = require("jsonwebtoken");

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
  } else if (error.name === "JsonWebTokenError") {
    response.status(401).send({ error: "token invalid" });
  }
  next(error);
};

const tokenExtractor = function (request, response, next) {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    const formattedAuth = authorization.replace("Bearer ", "");
    request.token = formattedAuth;
  }

  next();
};

const userExtractor = async function (request, response, next) {
  const tokenizedUser = jwt.verify(request.token, process.env.SECRET);
  request.user = await User.findById(tokenizedUser.id);
  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
