import { createContext, useContext, useEffect, useState } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children, isPlayer }) => {

    if (!isPlayer) {
        return <>{children}</>;
    }

    const [currentTrack, setCurrentTrack] = useState(null);
    // title: "",
    // artists: [],
    // albumCover: "",
    // durationMs: 0,

    return (
        <PlayerContext.Provider value={{ currentTrack, setCurrentTrack }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);