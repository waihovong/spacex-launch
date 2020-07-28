import React from 'react';
import LandingPage from './components/landingpage';
import LatestLaunch from './components/latestlaunch';
import Falconnine from './components/falconnine';
import FalconHeavy from './components/falconheavy';
import Starship from './components/starship';

import './App.css';

function App() {
  return (
    <div className="App">
      <LandingPage />
      <LatestLaunch />
      {/* <Falconnine /> */}
      {/* <FalconHeavy /> */}
      {/* <Starship /> */}
    </div>
  );
}

export default App;