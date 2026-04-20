import React, { useState, useEffect } from 'react';
import TrackCard from '../../../global/components/TrackCard/TrackCard';
import styles from './SubViewsStyle.module.css';
import defaultImage from '../../../assets/spotify_icon.png';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const PlaylistDetailsView = ({ selectedPlaylist, onBack, onTrackClick }) => {
    
    const [tracks, setTracks] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        setLoadingData(true);
        fetch(`${API_BASE_URL}/api/spotify/playlist?playlistId=${selectedPlaylist.id}`, { 
            credentials: 'include' 
        })
            .then(res => res.json())
            .then(data => {
                setTracks(data);
                setLoadingData(false);
            })
            .catch(err => {
                console.error("Błąd pobierania playlisty:", err);
                setLoadingData(false);
            });
    }, [selectedPlaylist.id]);

    
    if (loadingData) {
        return <div className={styles.loadingText}>Ładowanie utworów...</div>;
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={onBack}>
                ⬅ Powrót
            </button>
            
            <div className={styles.header}>
                <img 
                    src={selectedPlaylist.imageUrl || defaultImage}
                    alt={selectedPlaylist.name} 
                    className={styles.playlistImage} 
                />
                <div className={styles.playlistInfo}>
                    <span className={styles.upperTitle}>PLAYLISTA</span>
                    <h1 className={styles.playlistName}>{selectedPlaylist.name}</h1>
                    <p className={styles.playlistStats}>{selectedPlaylist.totalTracks} utworów</p>
                </div>
            </div>

            <div className={styles.tracksList}>
                {tracks.map((track) => (
                    <TrackCard 
                        key={track.id}
                        track={track} 
                        onClick={() => onTrackClick(track.id)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default PlaylistDetailsView;