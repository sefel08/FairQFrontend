import React from 'react';
import styles from './Queuebar.module.css';

import { useUser } from '../../../user/contexts/UserContext';

import TrackList from '../TrackList';

import deleteIcon from '../../../assets/delete_icon.svg'

const Queuebar = ({ queue = [] }) => {

    const { removeFromQueue } = useUser();

    const handleRemoveFromQueue = React.useCallback((track, index) => {
        removeFromQueue(index);
    }, [removeFromQueue]);

    return (
        <aside className={styles.container}>
            <div className={styles.scrollArea}>
                <h3 className={styles.title}>Kolejka</h3>
                {queue.length > 0 ? (
                    <TrackList tracks={queue} options={[{ label: 'Delete', icon: deleteIcon, color: 'var(--spotify-red)', onClick: handleRemoveFromQueue }]} />
                ) : (
                    <p style={{ color: 'var(--spotify-light-gray)', textAlign: 'center', fontSize: '1.25rem' }}>
                        Kolejka jest pusta
                    </p>
                )}
            </div>
        </aside>
    );
};

export default React.memo(Queuebar);