import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import UserProfile from '../../../global/components/UserProfile/UserProfile';
import { useParty } from '../../../global/contexts/PartyContext';

const Sidebar = () => {

  const { leavePartySession } = useParty();

  return (
    <div className={styles.sidebarContainer}>
      
      <UserProfile />

      <div className={styles.footer}>
        <button className={styles.backButton} onClick={leavePartySession}>
          ← Opóść party
        </button>
      </div>

    </div>
  );
};

export default Sidebar;