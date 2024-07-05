const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.status(200).json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate("user", {
      username: 1,
      name: 1,
    });

    if (!blog) {
      return response.status(404).send({ error: "blog not found" });
    }

    return response.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post(
  "/",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      if (!decodedToken.id) {
        return response.status(401).send({ error: "token invalid" });
      }

      const user = request.user;

      const payload = {
        ...request.body,
        user: user._id,
      };

      const blog = new Blog(payload);

      const savedBlog = await blog.save();
      user.blogs = [...user.blogs, savedBlog];
      await user.save();

      const populatedBlog = await savedBlog.populate("user", {
        username: 1,
        name: 1,
      });
      response.status(201).json(populatedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.put("/:id", async (request, response, next) => {
  const blog = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      runValidators: true,
      new: true,
    }).populate("user", { username: 1, name: 1 });

    if (!updatedBlog) {
      return response.status(404).send({ message: "blog not found" });
    }

    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete(
  "/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);

      if (!decodedToken.id) {
        return response.status(401).send({ error: "token invalid" });
      }

      const blog = await Blog.findById(request.params.id);

      if (!blog) {
        return response.status(404).send({ error: "blog not found" });
      }
      const user = request.user;

      if (!(blog.user.toString() === user._id.toString())) {
        return response.status(401).send({ error: "user not allowed" });
      }

      await Blog.findByIdAndDelete(request.params.id);
      user.blogs = user.blogs.filter((blog) => blog.id !== request.params.id);
      await user.save();
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.post("/:id/comments", async (req, res, next) => {
  try {
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).send({ error: "comment is missing" });
    }

    const commentObject = {
      comment,
      id: Math.random() * 10,
    };

    const blog = await Blog.findById(req.params.id).populate("user", {
      username: 1,
      name: 1,
    });

    if (!blog) {
      return res.status(404).send({ error: "blog not found" });
    }
    blog.comments = [...blog.comments, commentObject];
    await blog.save();

    return res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
