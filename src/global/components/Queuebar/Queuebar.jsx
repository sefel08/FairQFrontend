import React from 'react';
import styles from './Queuebar.module.css';

import { useUser } from '../../../user/contexts/UserContext';

import TrackList from '../TrackList';

import deleteIcon from '../../../assets/delete_icon.svg'

const Queuebar = () => {

    const { queue, removeFromQueue } = useUser();

    const handleRemoveFromQueue = React.useCallback((track, queueItemId) => {
        removeFromQueue(queueItemId);
    }, [removeFromQueue]);

    return (
        <aside className={styles.container}>
            <div className={styles.scrollArea}>
                <h3 className={styles.title}>Kolejka</h3>
                    {queue && Object.keys(queue).length > 0 ? (
                        <TrackList data={queue} options={[{ label: 'Delete', icon: deleteIcon, color: 'var(--spotify-red)', onClick: handleRemoveFromQueue }]} isQueue={true} />
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