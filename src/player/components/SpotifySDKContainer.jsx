import { useEffect, useState } from 'react';

import { useAuth } from '../../global/contexts/AuthContext';

const SpotifySDKContainer = () => {

    const { spotifyUserToken } = useAuth();

    const [player, setPlayer] = useState(undefined);

    useEffect(() => {
        if (!spotifyUserToken) return;

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
        const token = spotifyUserToken;
        const newPlayer = new window.Spotify.Player({
            name: 'Party Player for Spotify',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });

        setPlayer(newPlayer);

        newPlayer.addListener('ready', ({ device_id }) => {
            console.log('Gotowy do grania na ID:', device_id);
            // Tutaj warto wysłać device_id na backend, żeby wiedział gdzie puszczać muzykę
        });

        newPlayer.connect();
        };

        return () => {
        if (player) player.disconnect();
        };
    }, [spotifyUserToken]);

    return null;
};

export default SpotifySDKContainer;