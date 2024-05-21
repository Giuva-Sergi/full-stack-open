const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const info = require("./utils/logger");
const { mongoUrl, PORT } = require("./utils/config");
const Blog = require("./models/blog");

require("dotenv").config();

mongoose.connect(mongoUrl).then(() => console.log("CONNECTED TO MONGODB"));

app.use(cors());
app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
