import React from 'react';
import styles from './TrackProgressBar.module.css';
import { usePlayer } from '../../contexts/PlayerContext';
import { usePlayerPlaybackData } from '../../contexts/PlayerPlaybackContext';

const TrackProgressBar = () => {
    const { currentTrack } = usePlayer();
    const { progressMs, progressPercent } = usePlayerPlaybackData();

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={styles.progressBar}>
            <span className={styles.timeLabel}>
                {formatTime(currentTrack ? (progressMs <= currentTrack.durationMs ? progressMs : currentTrack.durationMs) : 0)}
            </span>
            <div className={styles.progressBarBg}>
                <div 
                    className={styles.progressBarFill}
                    style={{ width: `${progressPercent}%` }}>
                </div>
            </div>
            <span className={styles.timeLabel}>
                {formatTime(currentTrack ? currentTrack.durationMs : 0)}
            </span>
        </div>
    );
};

export default TrackProgressBar;