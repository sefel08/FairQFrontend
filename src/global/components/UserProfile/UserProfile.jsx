import React from 'react';
import styles from './UserProfile.module.css';
import default_avatar_image from '../../../assets/spotify_icon.png';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile = () => { 
    
    const { user, spotifyAuthorized, login } = useAuth();

    return (
        <div 
        className={`${styles.profileCard} ${!spotifyAuthorized ? styles.loginPointer : ''}`} 
        onClick={!spotifyAuthorized ? login : undefined}
        >
        {spotifyAuthorized && user ? (
            <>
            <img className={styles.avatar} src={(user.imageUrl === 'None') ? default_avatar_image : user.imageUrl} alt={user.displayName} />
            <span className={styles.username}>{user.displayName}</span>
            </>
        ) : (
            <>
            <img className={styles.avatar} src={default_avatar_image} alt="Zaloguj się" />
            <span className={styles.username}>Zaloguj się</span>
            </>
        )}
        </div>
    );
};

export default UserProfile;