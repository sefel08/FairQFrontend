import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../global/contexts/AuthContext';
import styles from './Sidebar.module.css';
import UserProfile from '../../../global/components/UserProfile/UserProfile';

const Sidebar = ({ onGoBack }) => {
  const { authorized, user, login } = useAuth();

  return (
    <div className={styles.sidebarContainer}>
      
      <UserProfile user={user} authorized={authorized} login={login} />

      <div className={styles.footer}>
        <button className={styles.backButton} onClick={onGoBack}>
          ← Zmień widok
        </button>
      </div>

    </div>
  );
};

export default Sidebar;