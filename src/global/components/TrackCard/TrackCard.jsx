import React from 'react';
import styles from './TrackCard.module.css';

const TrackCard = ({ track, onClick, squared }) => {
  
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div className={styles.trackCard + (squared ? ' ' + styles.squared : '')} onClick={() => onClick?.(track)}>
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
    </div>
  );
};

export default TrackCard;