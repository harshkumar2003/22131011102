// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const requestLogger = require('./middlewares/requestLogger');
const shortUrlRoutes = require('./routes/shortUrlRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

// Routes
app.use('/shorturls', shortUrlRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('✅ URL Shortener Backend Running!');
});

module.exports = app;
