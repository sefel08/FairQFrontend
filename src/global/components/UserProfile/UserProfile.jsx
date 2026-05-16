import React from 'react';
import styles from './UserProfile.module.css';
import { useAuth } from '../../contexts/AuthContext';

import default_avatar_image from '../../../assets/spotify_icon.png';
import default_avatar_image_loggedIn from '../../../assets/spotify_icon_green.png';

const UserProfile = () => { 
    
    const { user, spotifyAuthorized, login } = useAuth();

    return (
        <div 
<<<<<<< HEAD
            className={`${styles.profileCard} ${!spotifyAuthorized ? styles.notLoggedIn : ''}`} 
=======
            className={`${styles.profileCard} ${!spotifyAuthorized ? styles.loginPointer : ''}`} 
>>>>>>> 3e23b559d4717b70145d564883311c310fce0c58
            onClick={!spotifyAuthorized ? login : undefined}
        >
        {spotifyAuthorized && user ? (
            <>
            <img 
                className={styles.avatar} 
                src={(!user.imageUrl) ? (spotifyAuthorized) ? default_avatar_image_loggedIn : default_avatar_image : user.imageUrl} 
                alt={user.displayName}
            />
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