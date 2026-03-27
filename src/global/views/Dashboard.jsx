import React, { useState, useEffect } from 'react';
import SelectView from './SelectView';
import PlayerView from '../../player/views/PlayerView';
import UserView from '../../user/views/UserView';
import { UserProvider } from '../../user/contexts/UserContext';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('currentView') || null;
  });

  const resetView = () => {
    setCurrentView(null);
    localStorage.removeItem('currentView');
  }
  const handleViewChange = (view) => {
    setCurrentView(view);
    localStorage.setItem('currentView', view);
  }

  useEffect(() => {
    const savedView = localStorage.getItem('currentView');
    if (savedView) {
      setCurrentView(savedView);
    }
  }, []);

  return (
    <>
      {currentView === 'player' ? (
        <PlayerView />
      ) : currentView === 'user' ? (
        <UserProvider>
          <UserView goBackToViewSelection={resetView} />
        </UserProvider>
      ) : (
        <SelectView setCurrentView={handleViewChange} />
      )}
    </>
  );
};

export default Dashboard;