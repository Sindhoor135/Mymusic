import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaCompressAlt } from 'react-icons/fa';
import './PlayerStyles.css';

export const Player = ({ currentSong, isPlaying, onNext, onPrevious, togglePlayPause }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    // Set up the current song
    if (currentSong && currentSong.previewUrl) {
      audioRef.current.src = currentSong.previewUrl;
    }

    // Play or pause depending on the isPlaying state
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    } else {
      audioRef.current.pause();
    }

    return () => {
      // Clean up the audio when the component unmounts
      audioRef.current.pause();
      audioRef.current.src = ''; // Clear the current source
    };
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const handlePlayNext = () => {
      if (audioRef.current.ended) {
        onNext();
      }
    };

    audioRef.current.addEventListener('ended', handlePlayNext);
    return () => {
      audioRef.current.removeEventListener('ended', handlePlayNext);
    };
  }, [onNext]);

  const handlePlayPause = () => {
    togglePlayPause();
  };

  const handleNext = () => {
    // Stop the current song
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset to the beginning

    // Trigger the next song
    onNext();

    // Auto play the next song
    setTimeout(() => {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }, 100);
  };

  const handlePrevious = () => {
    // Stop the current song
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset to the beginning

    // Trigger the previous song
    onPrevious();

    // Auto play the previous song
    setTimeout(() => {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }, 100);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`player-container ${isMinimized ? 'minimized' : ''}`}>
      {!isMinimized && (
        <>
          <div className="player-controls">
            <FaStepBackward className="control-icon" onClick={handlePrevious} />
            <button className="play-pause-btn" onClick={handlePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <FaStepForward className="control-icon" onClick={handleNext} />
            <FaCompressAlt className="minimize-icon" onClick={handleMinimize} />
          </div>
          <div className="song-info">
            <p className="song-title">{currentSong?.title}</p>
            <p className="song-artist">{currentSong?.artist}</p>
          </div>
        </>
      )}
      {isMinimized && (
        <div className="player-minimized" onClick={handleMinimize}>
          <img src={currentSong?.albumCover} alt="Song Cover" className="player-minimized-icon" />
        </div>
      )}
    </div>
  );
};

export default Player;
