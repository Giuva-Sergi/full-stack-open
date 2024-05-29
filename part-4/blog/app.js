const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoUrl } = require("./utils/config");
const info = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const app = express();
const middleware = require("./utils/middleware");

require("dotenv").config();

mongoose.connect(mongoUrl).then(() => info("CONNECTED TO MONGODB"));

app.use(cors());
app.use(express.json());
// app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);

module.exports = app;
