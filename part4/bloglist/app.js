const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');
const middeware = require('./utils/middleware');

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

app.use('/api/blogs', blogsRouter);

app.use(middeware.unknownEndpoint);
app.use(middeware.errorHandler);

module.exports = app;
