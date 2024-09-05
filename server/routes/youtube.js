const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await youtube.search.list({
      part: 'snippet',
      q: query,
      maxResults: 10,
      type: 'video',
    });
    res.json(response.data.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
