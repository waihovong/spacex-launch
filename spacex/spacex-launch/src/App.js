import React from 'react';
import LandingPage from './components/landingpage';
import UpcomingLaunch from './components/upcominglaunch';
import Falconnine from './components/falconnine';
import FalconHeavy from './components/falconheavy';

import './App.css';

function App() {
  return (
    <div className="App">
      <LandingPage />
      <UpcomingLaunch />
      <Falconnine />
      <FalconHeavy />
    </div>
  );
}

export default App;