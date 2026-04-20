import React, { useState, useEffect, use } from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../contexts/AuthContext';
import SelectView from './SelectView';
import PlayerView from '../../player/views/PlayerView';
import UserView from '../../user/views/UserView';
import PartyView from '../../user/views/PartyView';
import { UserProvider } from '../../user/contexts/UserContext';
import { PlayerProvider } from '../../player/contexts/PlayerContext';
import { PartyProvider } from '../contexts/PartyContext';
import Navbar from '../components/Navbar/Navbar';
import SpotifySDKContainer from '../../player/components/SpotifySDKContainer';

const Dashboard = () => {
  
  const { authorized, loadingAuth } = useAuth();

  const [isPlayer, setIsPlayer] = useState(() => localStorage.getItem('isPlayer') === 'true');
  const [currentView, setCurrentView] = useState(() => localStorage.getItem('currentView') || null);
  const [navbarTabs, setNavbarTabs] = useState(() => {
    const savedTabs = localStorage.getItem('navbarTabs');
    return savedTabs ? JSON.parse(savedTabs) : [];
  });

  const resetView = () => {
    setCurrentView(null);
    localStorage.removeItem('currentView');
  }
  const handleSetIsPlayer = (val) => {
    setIsPlayer(val);
    localStorage.setItem('isPlayer', val);
  };
  const handleViewChange = (view) => {
    setCurrentView(view);
    localStorage.setItem('currentView', view);
  }
  const handleTabsChange = (tabs) => {
    localStorage.setItem('navbarTabs', JSON.stringify(tabs));
    setNavbarTabs(tabs);
  }


  if (loadingAuth) {
    return <div className={styles.loading}>Ładowanie...</div>;
  }

  return (
    <div className={styles.dashboard}>

      <PartyProvider changeView={handleViewChange}>
        {
          isPlayer && <SpotifySDKContainer />
        }

        {
        !authorized ? (
            <SelectView setNavbarTabs={handleTabsChange} setIsPlayer={handleSetIsPlayer} />
        ) : currentView === 'player' ? (
          <PlayerProvider>
            <PlayerView />
          </PlayerProvider>
        ) : currentView === 'user' ? (
          <UserProvider>
            <UserView goBackToViewSelection={resetView} />
          </UserProvider>
        ) : currentView === 'party' ? (
          <PartyView />
        ) : 
            <SelectView setNavbarTabs={handleTabsChange} setIsPlayer={handleSetIsPlayer} />
        }
      </PartyProvider>
      
      {navbarTabs.length > 0 &&
        <Navbar tabs={navbarTabs} changeView={handleViewChange} />
      }

    </div>
  );
};

export default Dashboard;