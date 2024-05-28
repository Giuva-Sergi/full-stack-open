const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoUrl } = require("./utils/config");
const info = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const app = express();
const errorHandler = require("./utils/middleware");

require("dotenv").config();

mongoose.connect(mongoUrl).then(() => info("CONNECTED TO MONGODB"));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use(errorHandler);

module.exports = app;
