import React, {useState} from 'react'
import SearchView from '../user/views/subViews/SearchView';
import PlaylistDetailView from '../user/views/subViews/PlaylistDetailView';

const MainBox = ({ currentView, selectedPlaylist, setView }) => {
    return (
        <div className="main-content-area">
            {currentView === 'search' ? (
                <SearchView onTrackClick={() => {}}/>
            ) : (
                <PlaylistDetailView 
                    selectedPlaylist={selectedPlaylist} 
                    onBack={() => setView('search')}
                    onTrackClick={() => {}} 
                />
            )}
        </div>
    );
};

export default MainBox;