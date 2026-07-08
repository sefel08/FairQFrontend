import React from 'react';
import styles from './SubViewsStyle.module.css';

import { useAuth } from '../../../global/contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

import SearchBox from '../../components/SearchBox/SearchBox';
import PlaylistCard from '../../../global/components/PlaylistCard/PlaylistCard';
import PlaylistContainer from '../../../global/components/PlaylistContainer/PlaylistContainer';

const HomeView = ({ setView }) => {

    const { user } = useAuth();
    const { setSearchQuery, searchQuery, searchResults, setSearchResults, queryForResults, setQueryForResults, userPlaylists, setSelectedPlaylist } = useUser();

    const handleSearch = (query) => {
        setSearchQuery(query);
        setView('search');
    }

    return (
        <div className={styles.container}>
            
            <SearchBox onSearch={handleSearch} />
            
            <h1 className={styles.header}>Dzień dobry, {user.displayName || "Użytkowniku"}</h1>
            
            <PlaylistContainer style={ { marginBottom: '1rem' } }>
                {userPlaylists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} onClick={() => setSelectedPlaylist(playlist)} variant={"compact"} />
                ))}
            </PlaylistContainer>

            <h2 className={styles.subHeader}>Wybrane dla Ciebie</h2>
            <p style={{color: 'var(--spotify-light-gray)', marginBottom: '1rem'}}>Twoje osobiste zestawienie utworów.</p>
        </div>
    );
};

export default HomeView;