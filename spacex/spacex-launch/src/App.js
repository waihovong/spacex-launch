import React from 'react';
import  {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Headroom from 'react-headroom';

import SpaceX from '../src/assets/images/SpaceX-Logo.svg';

import Navbar from './components/navbar';
import LandingPage from './components/landingpage';
import LatestLaunch from './components/latestlaunch';
import FalconHeavy from './components/vehicle_falconheavy';
import Starship from './components/vehicle_starship';
import PreviousLaunch from './components/previous';
import Launch from './components/launch';
import F9 from './components/vehicle_falcon9';

import './App.css';

function App() {
	return (
		<div className="App">
			<Router>
				<Headroom>
					< Navbar />
				</Headroom>
				<Switch>
					<Route path='/missions'>
						< PreviousLaunch />
					</Route>
					<Route path='/rocket/falcon9'>
						< F9 />
					</Route>
					<Route path='/rocket/falconheavy'>
						< FalconHeavy />
					</Route>
					<Route path='/rocket/starship'>
						< Starship />
					</Route>
					<Route path='/launch/:id' component={Launch}></Route>
					<Route path='/'>
						< LandingPage />
						< LatestLaunch />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;