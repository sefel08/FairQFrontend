import React, {useRef, useState} from 'react'

import { useUser } from '../../contexts/UserContext';

import style from './MainBox.module.css';
import SearchView from '../../views/subViews/SearchView';
import HomeView from '../../views/subViews/HomeView';
import LibraryView from '../../views/subViews/LibraryView';
import PlaylistDetailView from '../../views/subViews/PlaylistDetailView';

const MainBox = ({ userName, currentView, lastView, setView }) => {
    
    const { searchResults, setSearchResults,
        searchQuery, setSearchQuery,
        queryForResults, setQueryForResults,
        userPlaylists, setUserPlaylists,
        selectedPlaylist, setSelectedPlaylist,
    } = useUser();
    
    const mainBoxRef = useRef(null);

    const handlePlaylistSelect = (playlist) => {
        setSelectedPlaylist(playlist);
        setView('playlist');
    }

    return (
        <div className={style.mainContentArea} ref={mainBoxRef}>
            {currentView === 'search' ? (
                <SearchView 
                    scrollRef={mainBoxRef}
                    onTrackClick={() => {}}
                    setSearchQuery={setSearchQuery}
                    searchQuery={searchQuery}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    queryForResults={queryForResults}
                    setQueryForResults={setQueryForResults}
                />
            ) : currentView === 'home' ? (
                <HomeView 
                    userName={userName || "Użytkowniku"}
                    changeToSearchView={() => setView('search')}
                    setSearchQuery={setSearchQuery} 
                    userPlaylists={userPlaylists}
                    onPlaylistSelect={handlePlaylistSelect}
                />
            ) : currentView === 'library' ? (
                <LibraryView 
                    userPlaylists={userPlaylists} 
                    onPlaylistSelect={handlePlaylistSelect}
                />
            ) : (
                <PlaylistDetailView 
                    selectedPlaylist={selectedPlaylist} 
                    onBack={() => setView(lastView)}
                    onTrackClick={() => {}} 
                />
            )}
        </div>
    );
};

export default MainBox;