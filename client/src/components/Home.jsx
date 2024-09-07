import React, { useState, useEffect } from 'react';
import { getAllSongs, getSongsByLanguage } from '../api';
import { actionType } from '../Context/reducer';
import { useStateValue } from '../Context/StateProvider';
import Header from './Header';
import SearchBar from './SearchBar';
import { HomeSongContainer } from './HomeSongContainer';
import Player from './Player';
import './Homestyles.css';

const Home = () => {
  const [{ allSongs }, dispatch] = useStateValue();

  const [kannadaSongs, setKannadaSongs] = useState([]);
  const [hindiSongs, setHindiSongs] = useState([]);
  const [englishSongs, setEnglishSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSongs, setCurrentSongs] = useState([]);
  const [showPlayer, setShowPlayer] = useState(false);

  const fetchAllSongs = async () => {
    try {
      const data = await getAllSongs();
      dispatch({
        type: actionType.SET_ALL_SONGS,
        allSongs: data || [],
      });
    } catch (error) {
      console.error('Error fetching all songs:', error.message || error);
    }
  };

  const fetchSongsByLanguage = async (language, setSongs) => {
    try {
      const data = await getSongsByLanguage(language);
      setSongs(data || []);
    } catch (error) {
      console.error(`Error fetching ${language} songs:`, error.message || error);
    }
  };

  useEffect(() => {
    if (!allSongs || allSongs.length === 0) {
      fetchAllSongs();
    }
  }, [allSongs, dispatch]);

  useEffect(() => {
    if (kannadaSongs.length === 0) {
      fetchSongsByLanguage('kannada', setKannadaSongs);
    }
  }, [kannadaSongs]);

  useEffect(() => {
    if (hindiSongs.length === 0) {
      fetchSongsByLanguage('hindi', setHindiSongs);
    }
  }, [hindiSongs]);

  useEffect(() => {
    if (englishSongs.length === 0) {
      fetchSongsByLanguage('english', setEnglishSongs);
    }
  }, [englishSongs]);

  const handlePlaySong = (song, index, songs) => {
    if (!song || !song.previewUrl) {
      console.error('Invalid song object:', song);
      return;
    }
  
    // Set the current song and index
    setCurrentSong(song);
    setCurrentIndex(index);
    setCurrentSongs(songs);
    setShowPlayer(true);
    setIsPlaying(true);
  };

  const handlePauseSong = () => {
    setIsPlaying(false);
  };

  const handleNextSong = () => {
    if (currentIndex < currentSongs.length - 1) {
      const nextSong = currentSongs[currentIndex + 1];
      setCurrentSong(nextSong);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousSong = () => {
    if (currentIndex > 0) {
      const previousSong = currentSongs[currentIndex - 1];
      setCurrentSong(previousSong);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
  };

  return (
    <div className="home-container">
      <Header />
      <SearchBar />

      {allSongs && allSongs.length > 0 && (
        <div className="song-section">
          <h2 className="section-title">All Songs</h2>
          <HomeSongContainer
            musics={allSongs}
            onPlaySong={(song, index) => handlePlaySong(song, index, allSongs)}
          />
        </div>
      )}
      {kannadaSongs && kannadaSongs.length > 0 && (
        <div className="song-section">
          <h2 className="section-title">Kannada Songs</h2>
          <HomeSongContainer
            musics={kannadaSongs}
            onPlaySong={(song, index) => handlePlaySong(song, index, kannadaSongs)}
          />
        </div>
      )}
      {hindiSongs && hindiSongs.length > 0 && (
        <div className="song-section">
          <h2 className="section-title">Hindi Songs</h2>
          <HomeSongContainer
            musics={hindiSongs}
            onPlaySong={(song, index) => handlePlaySong(song, index, hindiSongs)}
          />
        </div>
      )}
      {englishSongs && englishSongs.length > 0 && (
        <div className="song-section">
          <h2 className="section-title">English Songs</h2>
          <HomeSongContainer
            musics={englishSongs}
            onPlaySong={(song, index) => handlePlaySong(song, index, englishSongs)}
          />
        </div>
      )}

      {showPlayer && (
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          onNext={handleNextSong}
          onPrevious={handlePreviousSong}
          onPause={handlePauseSong}
          togglePlayPause={togglePlayPause}
        />
      )}
    </div>
  );
};

export default Home;
