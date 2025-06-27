const path = require('path');
const Log = require(path.join(__dirname, '../../logging-middleware/logger'));

const requestLogger = async (req, res, next) => {
  await Log("backend", "info", "middleware", `Incoming ${req.method} ${req.url}`);
  next();
};

module.exports = requestLogger;
