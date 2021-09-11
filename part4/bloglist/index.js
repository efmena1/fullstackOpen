/* eslint-disable no-console */
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');
const app = require('./app');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});