import React, {useRef, useState} from 'react'

import { useUser } from '../../contexts/UserContext';

import style from './MainBox.module.css';
import SearchView from '../../views/subViews/SearchView';
import HomeView from '../../views/subViews/HomeView';
import LibraryView from '../../views/subViews/LibraryView';
import PlaylistDetailView from '../../views/subViews/PlaylistDetailView';

const MainBox = ({ currentView, setView }) => {

    const { selectedPlaylist, setSelectedPlaylist } = useUser();
    const mainBoxRef = useRef(null);

    return (
        <div className={style.mainContentArea} ref={mainBoxRef}>
            
            {selectedPlaylist ? (
                <PlaylistDetailView onBack={() => setSelectedPlaylist(null)} />
            ) : currentView === 'search' ? (
                <SearchView scrollRef={mainBoxRef} />
            ) : currentView === 'home' ? (
                <HomeView setView={setView} />
            ) : currentView === 'library' ? (
                <LibraryView />
            ) : (
                <div className={style.emptyView}>
                    <p>Select a view from the top menu</p>
                </div>
            )}
        </div>
    );
};

export default MainBox;