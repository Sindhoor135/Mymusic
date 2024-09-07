import React from 'react';
import './styles.css';

export const HomeSongContainer = ({ musics, onPlaySong, playingSong }) => {
  return (
    <div className="home-song-container">
      {musics.map((song, index) => (
        <div key={song.id} className="home-song-card">
          <img src={song.albumCover} alt={song.title} />
          <div className="home-song-info">
            <p className="home-song-title">{song.title}</p>
            <p className="home-song-artist">{song.artist}</p>
          </div>
          <button
            className="home-play-btn"
            onClick={() => onPlaySong(song, index, musics)}
          >
            {playingSong && playingSong.id === song.id ? 'Pause' : 'Play'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default HomeSongContainer;
