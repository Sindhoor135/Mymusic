import axios from 'axios';

const baseURL = 'http://localhost:5000/';

// Validate User
export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}api/users/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error validating user:', error.message || error);
    return null;
  }
};

// Fetch All Artists
export const getAllArtist = async () => {
  try {
    const res = await axios.get(`${baseURL}api/artists/getAll`);
    return res.data;
  } catch (error) {
    console.error('Error fetching artists:', error.message || error);
    return [];
  }
};

// Fetch All Albums
export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}api/albums/getAll`);
    return res.data;
  } catch (error) {
    console.error('Error fetching albums:', error.message || error);
    return [];
  }
};

// Fetch All Songs
export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}api/songs`);
    return res.data;
  } catch (error) {
    console.error('Error fetching all songs:', error.message || error);
    return [];
  }
};

// Fetch Categories
// export const getAllCategories = async () => {
//   try {
//     const response = await fetch(`${baseURL}api/categories`);
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching categories:', error.message || error);
//     return [];
//   }
// };


export const getSongsByLanguage = async (language) => {
  try {
    const res = await axios.get(`/api/songs/${language}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching ${language} songs:`, error);
    return [];
  }
};


// Fetch Songs by Category
export const getSongsByCategory = async (category) => {
  try {
    const response = await fetch(`${baseURL}api/songs?category=${category}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching songs by category:', error.message || error);
    return [];
  }
};
