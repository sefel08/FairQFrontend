import React, { useState, useEffect, useRef, useCallback } from 'react';
import TrackCard from '../../../global/components/TrackCard/TrackCard';
import styles from './SubViewsStyle.module.css';
import defaultImage from '../../../assets/spotify_icon.png';
import { p } from 'framer-motion/client';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const PlaylistDetailsView = ({ selectedPlaylist, onBack, onTrackClick }) => {
    
    const TRACKS_RETURN_LIMIT = 50; // Spotify API returns max 100 tracks per request
    const [tracks, setTracks] = useState([]);
    const [offset, setOffset] = useState(0);
    const downloadingRef = useRef(false); // to prevent multiple simultaneous downloads
    const [loadingData, setLoadingData] = useState(false);

    const sentinelRef = useRef(null);


    const downloadPlaylistItems = useCallback(async () => {
        if (downloadingRef.current) return; // already loading
        if (offset > selectedPlaylist.totalTracks) return; // all tracks loaded

        downloadingRef.current = true;
        setLoadingData(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/spotify/playlist?playlistId=${selectedPlaylist.id}&offset=${offset}`, { 
                credentials: 'include'
            });
            
            if (!res.ok) throw new Error(`Status: ${res.status}`);
            
            const data = await res.json();
            setTracks(prevTracks => [...prevTracks, ...data]);
            setOffset(prevOffset => prevOffset + TRACKS_RETURN_LIMIT);
        } catch (err) {
            console.error("Błąd pobierania:", err);
        } finally {
            downloadingRef.current = false;
            setLoadingData(false);
        }
    }, [selectedPlaylist.id, offset]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    downloadPlaylistItems();
                }
            },
            { threshold: 0.1 } // active when 10% of the sentinel is visible
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
    }, [downloadPlaylistItems]);


    return (
        <>
            <button className={styles.backButton} onClick={onBack}>⬅</button>
            <div className={styles.container + ' ' + styles.containerUpgrade}>
                <div className={styles.playlistDataWrapper}>
                    <img 
                        src={selectedPlaylist.imageUrl || defaultImage}
                        alt={selectedPlaylist.name} 
                        className={styles.playlistImage} 
                    />
                    <div className={styles.playlistInfo}>
                        <span className={styles.upperTitle}>Playlista</span>
                        <h1 className={styles.playlistName}>{selectedPlaylist.name}</h1>
                        <p className={styles.playlistStats}>{selectedPlaylist.totalTracks} utworów</p>
                    </div>
                </div>

                <hr style={{ marginBottom: '20px', marginTop: '0', width: '100%' }}/>

                <div className={styles.list}>
                    {tracks.map((track) => (
                        <TrackCard 
                            key={track.id}
                            track={track} 
                            onClick={() => onTrackClick(track.id)} 
                        />
                    ))}

                    {tracks.length === 0 && !loadingData && (
                        <p style={{ fontSize: '1.5rem', color: 'var(--spotify-light-gray)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Brak utworów do wyświetlenia</p>
                    )}
                    
                    <div ref={sentinelRef} style={{ height: '2rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '10px', fontSize: '1.5rem', color: 'var(--spotify-light-gray)' }}>
                        {loadingData && 'Ładowanie utworów...'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaylistDetailsView;