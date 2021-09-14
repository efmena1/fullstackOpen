const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;
  const passMinLength = 3;
  if (body.password.length < passMinLength) {
    return response.status(400).json({ error: '`password` must be at least 3 characters long' });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  return response.json(savedUser);
});

module.exports = usersRouter;
