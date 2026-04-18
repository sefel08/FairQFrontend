import { createContext, useContext, useState, useEffect, use } from 'react';

import { useAuth } from '../../global/contexts/AuthContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const { spotifyAuthorized, loadingAuth } = useAuth();

    const [searchQuery, setSearchQuery] = useState('');
    const [queryForResults, setQueryForResults] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [userPlaylists, setUserPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const [queue, setQueue] = useState([]);

    // Fetch user playlists when authorized state changes
    useEffect(() => {

        if(loadingAuth || !spotifyAuthorized) {
            setUserPlaylists([]);
            return;
        }
        
        fetch('http://127.0.0.1:8080/api/spotify/user-playlists', {
            credentials: 'include',
        })
        .then(res => {
            if (res.status != 200) {
                console.log("Could not fetch playlists.");
                return [];
            }
            return res.json();
        })
        .then(data => {
            setUserPlaylists(data);
        })
        .catch(err => console.error("Błąd", err));

    }, [spotifyAuthorized, loadingAuth]);

    const refreshUserQueue = () => {
        fetch('http://127.0.0.1:8080/api/party/queue', {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            setQueue(data);
        })
        .catch(err => console.error("Błąd", err));
    };
    const addToQueue = (trackId) => {
        fetch('http://127.0.0.1:8080/api/party/queue', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ trackId })
        }).then(() => refreshUserQueue());
    };
    const removeFromQueue = (index) => {
        fetch(`http://127.0.0.1:8080/api/party/queue`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ index })
        }).then(() => refreshUserQueue());
    };

    return (
        <UserContext.Provider value={{ 
            searchResults, setSearchResults, 
            searchQuery, setSearchQuery, 
            queryForResults, setQueryForResults, 
            userPlaylists, refreshUserQueue,
            selectedPlaylist, setSelectedPlaylist,
            queue, addToQueue, removeFromQueue
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);