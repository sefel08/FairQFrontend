import { small } from 'framer-motion/client';
import { createContext, useContext, useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();
    
export const AuthProvider = ({ children }) => {
    const [authorized, setAuth] = useState(false);
    const [spotifyAuthorized, setSpotifyAuth] = useState(false);
    const [spotifyUserToken, setSpotifyUserToken] = useState(null);
    const [user, setUser] = useState({ displayName: '', imageUrl: '', smallImageUrl: '' });

    const [loadingAuth, setLoadingAuth] = useState(true);

    const refreshStatus = async () => {
        if(authorized && spotifyAuthorized) return;

        setLoadingAuth(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/status`, { credentials: 'include' });
            const data = await res.json();
            
            setAuth(data.isLoggedIn);

            if (data.isLoggedIn) {
                setSpotifyAuth(data.isSpotifyAuthenticated);
                setUser({
                    displayName: data.displayName,
                    imageUrl: data.imageUrl,
                    smallImageUrl: data.imageUrlSmall
                });
                setSpotifyUserToken(data.spotifyUserToken);
            }
            
        } catch (err) {
            console.error("Sesja wygasła lub błąd połączenia");
        } finally {
            setLoadingAuth(false);
        }

    };
    const login = (asHost = false) => {
        const endpoint = asHost ? 'spotify-host' : 'spotify';
        window.location.href = `${API_BASE_URL}/oauth2/authorization/${endpoint}`;
    };
    const loginAsGuest = (displayName) => {
        return fetch(`${API_BASE_URL}/api/user/login-as-guest`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'Text/plain'
            },
            body: displayName
        }).then(
            () => refreshStatus()
        );
    };

    useEffect(() => {
        refreshStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ authorized, spotifyAuthorized, loadingAuth, user, login, refreshStatus, loginAsGuest, spotifyUserToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);