import React, { useEffect, useState, useCallback } from "react";
import styles from "./PartyView.module.css";
import { LayoutGroup, AnimatePresence, motion } from "framer-motion";

import { useParty } from "../../global/contexts/PartyContext";
import { usePartySelector } from "../../global/components/usePartySelector";

import PoweredBySpotify from "../../global/components/PoweredBySpotify/PoweredBySpotify";
import AddedTrack from "../components/AddedTrack/AddedTrack";
import UserCard from "../components/UserCard/UserCard";

const PartyView = () => {

    const { getPartyQueue, getPartyUsers } = useParty();

    const [currentSubView, setCurrentSubView] = useState('queue');

    const queueVersion = usePartySelector(state => state.partyQueueVersion);
    const usersVersion = usePartySelector(state => state.partyUsersVersion);
    const [partyQueueInfo, setPartyQueueInfo] = useState({ queue: [], currentlyPlaying: null });
    const [partyUsers, setPartyUsers] = useState([]);

    // TrackCards options
    const [selectedCardListId, setSelectedCardListId] = useState(null);
    const handleCardClick = useCallback((uniqueId) => {
        setSelectedCardListId(selectedCardListId === uniqueId ? null : uniqueId);
    }, [selectedCardListId]);

    useEffect(() => {
        getPartyQueue().then(queueData => setPartyQueueInfo(queueData));
    }, [queueVersion]);
    useEffect(() => {
        getPartyUsers().then(usersData => setPartyUsers(usersData));
    }, [usersVersion]);

    return (
        <div className={styles.container}>
        
            {/* Header */}
            <header className={styles.header}>
                <button className={`${styles.headerButton} ${currentSubView === 'queue' ? styles.activeHeaderButton : ''}`} onClick={() => setCurrentSubView('queue')}>Queue</button>
                <button className={`${styles.headerButton} ${currentSubView === 'users' ? styles.activeHeaderButton : ''}`} onClick={() => setCurrentSubView('users')}>Użytkownicy</button>
            </header>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <PoweredBySpotify />
                {currentSubView === 'queue' ? (
                    <div className={styles.addedTrackList}>
                        {partyQueueInfo.currentlyPlaying && (
                        <div className={styles.currentlyPlaying}>
                            <h3 className={styles.mainContentHeader}>Currently Playing</h3>
                            {partyQueueInfo.currentlyPlaying && (
                                <AddedTrack 
                                    track={partyQueueInfo.currentlyPlaying.track}
                                    profile={partyQueueInfo.currentlyPlaying.profile}
                                    listUniqueId={0}
                                    isOpen={selectedCardListId === 0}
                                    onClick={handleCardClick}
                                    withoutUnderline={true} 
                                />
                            )}
                        </div>
                        )}
                        {partyQueueInfo.queue && Object.keys(partyQueueInfo.queue).length > 0 ?
                        (<>
                            <hr style={{ marginBottom: '1dvh', marginTop: '0', width: '100%' }}/>
                            <LayoutGroup>
                                <AnimatePresence initial={false}>
                                    {Object.entries(partyQueueInfo.queue).map(([queueItemId, item]) => (
                                        <motion.div
                                            key={queueItemId}
                                            layout
                                            initial={{ 
                                                opacity: 0,
                                            }}
                                            animate={{ 
                                                opacity: 1,
                                            }}
                                            exit={{ 
                                                opacity: 0,
                                            }}
                                            transition={{
                                                type: 'tween',
                                                ease: [0.25, 1, 0.5, 1],
                                                duration: 0.25
                                            }}
                                        >
                                            <AddedTrack
                                                track={item.track}
                                                profile={item.profile}
                                                listUniqueId={queueItemId}
                                                isOpen={selectedCardListId === queueItemId}
                                                onClick={handleCardClick}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </LayoutGroup>
                        </>) : (<>
                            <h3 className={styles.mainContentHeader}>Queue is empty</h3>
                        </>)}
                    </div>
                ) : (
                    <div className={styles.userGrid}>
                        {partyUsers.map((user, index) => (
                            <UserCard key={index} user={user} />
                        ))}
                    </div>
                )}
            </main>

        </div>
    )
}

export default PartyView;