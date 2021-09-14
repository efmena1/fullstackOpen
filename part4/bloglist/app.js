const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middeware = require('./utils/middleware');
const logger = require('./utils/logger');

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middeware.requestLogger);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

app.use(middeware.unknownEndpoint);

app.use(middeware.errorHandler);

module.exports = app;
