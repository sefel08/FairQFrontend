import React, { useState, useEffect, useCallback } from 'react';
import styles from './SubViewsStyle.module.css';

import { useUser } from '../../contexts/UserContext';

import SearchBox from '../../components/SearchBox/SearchBox';
import TrackList from '../../../global/components/TrackList';

import addToQueueIcon from '../../../assets/add_to_queue_icon.svg';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SearchView = ({ scrollRef }) => {

    const { addToQueue, setSearchQuery, searchQuery, searchResults, setSearchResults, queryForResults, setQueryForResults } = useUser();

    const searchTracks = async (query) => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/spotify/search?query=${encodeURIComponent(query)}`, {
                credentials: 'include',
            });
            
            if (res.status !== 200) {
                console.log('error while searching tracks: ', res.status);
                return;
            }

            const data = await res.json();
            setSearchResults(data);

            if (scrollRef && scrollRef.current) {
                scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }

        } catch (error) {
            console.error("Failed to search tracks:", error);
        }
    };

    const handleTrackAddToQueue = useCallback((track) => {
        addToQueue(track.id);
    }, [addToQueue]);

    useEffect(() => {
        if (searchQuery) {
            searchTracks(searchQuery);
            setQueryForResults(searchQuery);
            setSearchQuery('');
        }
    }, [searchQuery]);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Szukaj piosenek</h1>
            
            <SearchBox onSearch={setSearchQuery} />

            {searchResults.length > 0 && queryForResults && (
                <h2 className={styles.subHeader}>Wyniki dla "{queryForResults}"</h2>
            )}

            <div className={styles.list}>
                <TrackList tracks={searchResults} options={[{ label: 'Add to Queue', icon: addToQueueIcon, color: 'var(--spotify-green)', onClick: handleTrackAddToQueue }]} />
            </div>
        </div>
    );
};

export default SearchView;