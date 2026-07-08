import React, { useState, useCallback } from 'react';

import TrackCard from '../components/TrackCard/TrackCard';

const TrackList = ({ tracks, options }) => {

    const [openedCard, setOpenedCard] = useState(null);

    const handleCardClick = useCallback((uniqueKey) => {
        setOpenedCard(prevOpenedCard => prevOpenedCard === uniqueKey ? null : uniqueKey);
    }, []);

    return (
        <>
            {tracks.map((track, index) => {
                const uniqueKey = track.id + index;
                return (
                    <TrackCard 
                        key={uniqueKey}
                        onClick={handleCardClick}
                        isOpen={openedCard === uniqueKey}
                        track={track}
                        index={index}
                        options={options}
                    />
                );
            })}
        </>
    )
}

export default React.memo(TrackList);