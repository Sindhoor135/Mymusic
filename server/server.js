const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Spotify API token generation

async function getSpotifyAccessToken() {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error.message || error);
    throw new Error('Failed to fetch access token');
  }
}

// Spotify song search route
app.get('/api/songs', async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    const searchQuery = req.query.q || 'Popular Songs';
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: searchQuery,
        type: 'track',
        limit: 10
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const songs = response.data.tracks.items.map(item => ({
      title: item.name,
      artist: item.artists[0].name,
      albumCover: item.album.images[0].url,
      previewUrl: item.preview_url, // Preview URL for the song
    }));

    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs from Spotify:', error.message || error);
    res.status(500).send('Failed to fetch songs');
  }
});

//Get hindi songs
app.get('/api/songs/hindi', async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    const searchQuery = req.query.q || 'Popular Hindi Songs';
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: searchQuery,
        type: 'track',
        limit: 10
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const songs = response.data.tracks.items.map(item => ({
      title: item.name,
      artist: item.artists[0].name,
      albumCover: item.album.images[0].url,
      previewUrl: item.preview_url, // Preview URL for the song
    }));

    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs from Spotify:', error.message || error);
    res.status(500).send('Failed to fetch songs');
  }
});

//get all kannada songs
app.get('/api/songs/kannada', async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    const searchQuery = req.query.q || 'Popular Kannaada Songs';
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: searchQuery,
        type: 'track',
        limit: 10
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const songs = response.data.tracks.items.map(item => ({
      title: item.name,
      artist: item.artists[0].name,
      albumCover: item.album.images[0].url,
      previewUrl: item.preview_url, // Preview URL for the song
    }));

    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs from Spotify:', error.message || error);
    res.status(500).send('Failed to fetch songs');
  }
});

//english songs
app.get('/api/songs/english', async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    const searchQuery = req.query.q || 'Popular english Songs';
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: searchQuery,
        type: 'track',
        limit: 10
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const songs = response.data.tracks.items.map(item => ({
      title: item.name,
      artist: item.artists[0].name,
      albumCover: item.album.images[0].url,
      previewUrl: item.preview_url, // Preview URL for the song
    }));

    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs from Spotify:', error.message || error);
    res.status(500).send('Failed to fetch songs');
  }
});

// Get all albums from Spotify
app.get('/api/albums/getAll', async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    const searchQuery = req.query.q || 'album songs';
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: searchQuery,
        type: 'album',
        limit: 10
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const albums = response.data.albums.items.map(item => ({
      title: item.name,
      artist: item.artists[0].name,
      albumCover: item.images[0].url,
      releaseDate: item.release_date,
    }));

    res.json(albums);
  } catch (error) {
    console.error('Error fetching albums from Spotify:', error.message || error);
    res.status(500).send('Failed to fetch albums');
  }
});

// Get all artists from Spotify
app.get('/api/artists/getAll', async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    const searchQuery = req.query.q || 'artists';
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: searchQuery,
        type: 'artist',
        limit: 10
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const artists = response.data.artists.items.map(item => ({
      name: item.name,
      genres: item.genres,
      imageUrl: item.images[0]?.url || '',  // Handle cases where images might be missing
    }));

    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists from Spotify:', error.response?.data || error.message || error);
    res.status(500).send('Failed to fetch artists');
  }
});


// Fetch songs by category
app.get('/api/songs/byCategory', async (req, res) => {
  try {
    const accessToken = await getSpotifyAccessToken();
    const category = req.query.category || 'Top Songs';
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: category,
        type: 'track',
        limit: 10
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const songs = response.data.tracks.items.map(item => ({
      title: item.name,
      artist: item.artists[0].name,
      albumCover: item.album.images[0].url,
      previewUrl: item.preview_url, // Preview URL for the song
    }));

    res.json(songs);
  } catch (error) {
    console.error('Error fetching songs by category from Spotify:', error.message || error);
    res.status(500).send('Failed to fetch songs by category');
  }
});

// MongoDB User Routes
const userRoute = require('./routes/auth');
app.use('/api/users', userRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err.message));
