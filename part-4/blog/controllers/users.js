const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  res.status(200).json(users);
});

usersRouter.post("/", async (req, res, next) => {
  const { name, username, password } = req.body;

  if (!password) {
    res.status(400).send({ error: "password is required" });
  }

  if (password?.length < 3) {
    res
      .status(400)
      .send({ error: "password must be at least 3 characters long" });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
