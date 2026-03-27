import React from 'react';
import styles from './SubViewsStyle.module.css';
import PlaylistCard from '../../../global/components/PlaylistCard/PlaylistCard';

const LibraryView = ({ userPlaylists, onPlaylistSelect }) => {
    return (
        <div className={styles.container}>
            <header className={styles.stickyHeader}>
                <h1 className={styles.header}>Twoja Biblioteka</h1>
                <div className={styles.filterBar}>
                    <button className={`${styles.chip} ${styles.activeChip}`}>Playlisty</button>
                    <button className={styles.chip}>Wykonawcy</button>
                    <button className={styles.chip}>Albumy</button>
                </div>
            </header>

            {/* playlist cards */}
            <div className={styles.list}>
                {userPlaylists.map(playlist => (
                    <PlaylistCard playlist={playlist} onClick={() => onPlaylistSelect(playlist)} />
                ))}
            </div>
        </div>
    );
};

export default LibraryView;