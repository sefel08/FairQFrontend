import React, { useState } from 'react';
import styles from './TrackCard.module.css';

import { motion } from 'framer-motion';

const TrackCard = ({ track, onClick, squared }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div className={styles.trackCardContainer} onClick={() => setIsOpen(!isOpen)}>
      <motion.div layout className={styles.trackCard + (squared ? ' ' + styles.squared : '')} >
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
        animate={{ width: isOpen ? '25%' : '0%' }}
        onClick={(e) => e.stopPropagation()}
      >
        {isOpen && (
          <button className={styles.optionsButton} onClick={(e) => { e.stopPropagation(); }} >
            X
          </button>
        )}
      </motion.div>

    </div>
  );
};

export default TrackCard;