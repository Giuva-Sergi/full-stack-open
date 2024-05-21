const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoUrl } = require("./utils/config");
const info = require("./utils/logger");
const notesRouter = require("./controllers/blogs");
const app = express();

require("dotenv").config();

mongoose.connect(mongoUrl).then(() => info("CONNECTED TO MONGODB"));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", notesRouter);

module.exports = app;
