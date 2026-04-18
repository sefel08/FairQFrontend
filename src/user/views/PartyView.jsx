import React, { useEffect, useState } from "react";
import { useParty } from "../../global/contexts/PartyContext";
import styles from "./PartyView.module.css";
import AddedTrack from "../components/AddedTrack/AddedTrack";

const PartyView = () => {

    const [currentSubView, setCurrentSubView] = useState('queue');

    const { getPartyQueue } = useParty();
    const [partyQueue, setPartyQueue] = useState([]);

    useEffect(() => {
        getPartyQueue().then(data => {
            if (data) {
                setPartyQueue(data);
            } else {
                setPartyQueue([]);
            }
        });
    }, []);


    return (
        <div className={styles.container}>
        
            {/* Header */}
            <header className={styles.header}>
                <button className={`${styles.headerButton} ${currentSubView === 'queue' ? styles.activeHeaderButton : ''}`} onClick={() => setCurrentSubView('queue')}>Queue</button>
                <button className={`${styles.headerButton} ${currentSubView === 'users' ? styles.activeHeaderButton : ''}`} onClick={() => setCurrentSubView('users')}>Użytkownicy</button>
            </header>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {partyQueue.map( (item, index) => (
                    <AddedTrack key={index} track={item.track} profile={item.profile} />
                ))}
            </main>

        </div>
    )
}

export default PartyView;