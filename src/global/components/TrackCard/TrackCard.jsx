import React, { useCallback } from 'react';
import styles from './TrackCard.module.css';

import { motion } from 'framer-motion';
import spotify_icon from "../../../assets/spotify_icon_black.png";

const TrackCard = ({ isOpen, onClick, track, index, options, squared }) => {
  
  const handleOpenInSpotify = useCallback(() => {
      window.open(track.uri, '_blank');
  }, [track.uri]);

  const getOptionStyle = (optIndex, option, isSpotifyRedirect) => {
    const baseStyle = isSpotifyRedirect ? { backgroundColor: 'var(--spotify-green)' } : { backgroundColor: option.color || 'var(--spotify-green)' };
    
    if (options && options.length !== 0) {
      return optIndex === options.length - 1 && !isSpotifyRedirect ? { ...baseStyle, borderBottomRightRadius: '4px', borderTopRightRadius: '4px' } : baseStyle;
    } else {
      return { ...baseStyle, borderBottomRightRadius: '4px', borderTopRightRadius: '4px' };
    }

    return baseStyle;
  }

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div className={styles.trackCardContainer} >
      <motion.div layout className={styles.trackCard + (squared ? ' ' + styles.squared : '')} onClick={() => onClick(track.id + index)}>
        <img 
          src={track.imageUrl} 
          alt={track.name} 
          className={styles.albumImage + (squared ? ' ' + styles.squared : '')} 
        />
        
        <div className={styles.trackDetails}>
          <span className={styles.trackName}>{track.name}</span>
          <span className={styles.trackArtists}>
            {track.artists && track.artists.join(', ')}
          </span>
        </div>

        <div className={styles.trackMeta}>
          <span className={styles.duration}>{formatTime(track.durationMs)}</span>
        </div>
      </motion.div>

      <motion.div 
        className={styles.optionsContainer}
        initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
        animate={{ clipPath: isOpen ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)' }}
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.optionsButton}
          style={getOptionStyle(0, null, true)}
          onClick={handleOpenInSpotify}
        >
          <img src={spotify_icon} alt="Open in Spotify" className={styles.optionIcon} />  
        </button>

        {options && options.map((option, optIndex) => (
            <button 
              key={optIndex}
              className={styles.optionsButton}
              style={getOptionStyle(optIndex, option, false)}
              onClick={() => option.onClick(track, index) }
            >
              <img src={option.icon} alt={option.label} className={styles.optionIcon} />  
            </button>
          ))
        }
      </motion.div>

    </div>
  );
};

export default React.memo(TrackCard);