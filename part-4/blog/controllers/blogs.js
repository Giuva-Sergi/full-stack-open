const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const users = await User.find({});
  const selectedUser = users.at(Math.floor(Math.random() * users.length));

  const payload = {
    ...request.body,
    user: selectedUser._id,
  };

  try {
    const blog = new Blog(payload);

    const savedBlog = await blog.save();
    selectedUser.blogs = [...selectedUser.blogs, savedBlog];
    await selectedUser.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      runValidators: true,
      new: true,
    });
    if (!updatedBlog) {
      response.status(404).send({ message: "blog not found" });
    }
    response.status(201).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
