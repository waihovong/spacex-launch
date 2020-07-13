import React from 'react';
import Navbar from './components/navbar';
import Upcoming from './components/upcominglaunch';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Upcoming />
    </div>
  );
}

export default App;