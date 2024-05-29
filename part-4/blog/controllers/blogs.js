const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// const extractToken = function (request) {
//   const authorization = request.get("authorization");

//   if (authorization && authorization.startsWith("Bearer ")) {
//     return authorization.replace("Bearer ", "");
//   }

//   return null;
// };

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    response.status(401).send({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const payload = {
    ...request.body,
    user: user._id,
  };

  try {
    const blog = new Blog(payload);

    const savedBlog = await blog.save();
    user.blogs = [...user.blogs, savedBlog];
    await user.save();

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
