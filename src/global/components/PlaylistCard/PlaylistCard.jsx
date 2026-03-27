import React from 'react';
import style from './PlaylistCard.module.css';

const PlaylistCard = ({ playlist, onClick, variant }) => {
  
  const cardClass = `${style.playlistCard} ${variant === 'compact' ? style.compact : ''}`;

  return (
    <div className={cardClass} onClick={() => onClick?.(playlist)}>
      <img src={playlist.imageUrl} alt={playlist.name} className={style.image} />
      <div className={style.textContainer}>
        <h3 className={style.name}>{playlist.name}</h3>
          {variant !== 'compact' && (
            <p className={style.tracksCount}>{playlist.totalTracks} tracks</p>
          )}
      </div>
    </div>
  );
};

export default PlaylistCard;