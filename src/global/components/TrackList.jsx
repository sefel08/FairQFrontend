import React, { useState, useCallback, useMemo } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import TrackCard from '../components/TrackCard/TrackCard';

const TrackList = ({ data, options, isQueue }) => {

    const [openedCardListId, setOpenedCardListId] = useState(null);

    const normalizedTracks = useMemo(() => {
        if (!data) return [];

        // map
        if (isQueue && !Array.isArray(data)) {
        return Object.entries(data).map(([queueItemId, track]) => ({
            listUniqueId: queueItemId, 
            queueItemId: queueItemId,
            track: track
        }));
        }

        // list of tracks
        if (Array.isArray(data)) {
        return data.map((track, index) => ({
            listUniqueId: `${track.id}-${index}`, 
            queueItemId: null,
            track: track
        }));
        }

        return [];
    }, [data]);

    const handleCardClick = useCallback((uniqueKey) => {
        setOpenedCardListId(prevOpenedCard => prevOpenedCard === uniqueKey ? null : uniqueKey);
    }, []);

    return (
        <>
            <LayoutGroup>
                <AnimatePresence initial={false}>
                    {normalizedTracks.map((item, index) => (
                        <motion.div
                            key={item.listUniqueId}
                            layout
                            exit={{ 
                                opacity: 0, 
                                overflow: 'hidden',
                                transition: { duration: 0.1 }
                            }}
                            transition={{
                                type: 'tween',
                                ease: [0.55, 0.055, 0.675, 0.19],
                                duration: 0.15
                            }}
                        >
                            <TrackCard 
                                key={item.listUniqueId}
                                onClick={handleCardClick}
                                isOpen={openedCardListId === item.listUniqueId}
                                track={item.track}
                                listUniqueId={item.listUniqueId}
                                queueItemId={item.queueItemId}
                                options={options}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </LayoutGroup>
        </>
    )
}

export default React.memo(TrackList);