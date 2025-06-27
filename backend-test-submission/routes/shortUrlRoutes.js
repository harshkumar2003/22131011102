const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

const urls = []; // Temporary in-memory store

// POST /shorturls - Create short URL
router.post('/', (req, res) => {
  const { originalUrl, validityMinutes, preferredCode } = req.body;

  if (!originalUrl || !originalUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid or missing originalUrl' });
  }

  const shortcode = preferredCode || nanoid(6);
  const expiry = validityMinutes
    ? Date.now() + parseInt(validityMinutes) * 60 * 1000
    : null;

  urls.push({ originalUrl, shortcode, expiry });

  res.status(201).json({ shortcode, originalUrl, expiry });
});

// GET /shorturls/:shortcode - Stats for shortcode
router.get('/:shortcode', (req, res) => {
  const { shortcode } = req.params;
  const found = urls.find((u) => u.shortcode === shortcode);

  if (!found) return res.status(404).json({ error: 'Shortcode not found' });

  res.json(found);
});

module.exports = router;
