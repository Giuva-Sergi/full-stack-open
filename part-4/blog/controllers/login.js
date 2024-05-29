const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !isPasswordCorrect) {
    res.status(401).send({ error: "invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  console.log(token);

  res.status(200).send({ token, username, name: user.name });
});

module.exports = loginRouter;
