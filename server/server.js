const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

// YouTube API route
app.get('/api/songs', async (req, res) => {
  try {
    const searchQuery = req.query.q || 'Top Songs'; // Example query
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(searchQuery)}&key=${process.env.YOUTUBE_API_KEY}`
    );
    
    const songs = response.data.items.map(item => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
    
    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs from YouTube:', error);
    res.status(500).send('Failed to fetch songs');
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`)))
  .catch(err => console.error(err));
