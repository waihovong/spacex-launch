import React from 'react';
import  {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Headroom from 'react-headroom';

import SpaceX from '../src/assets/images/SpaceX-Logo.svg';

import LandingPage from './components/landingpage';
import LatestLaunch from './components/latestlaunch';
import Falconnine from './components/falconnine';
import FalconHeavy from './components/falconheavy';
import Starship from './components/starship';
import PreviousLaunch from './components/previous';
import Launch from './components/launch';

import './App.css';

function App() {
	return (
		<div className="App">
			<Router>
				<Headroom>
					<div className="navigation-container">
						<div className="navigation-container-inner">
							<img src={SpaceX}
								alt="spacex logo"
								className="navigation-header"
							/>
							<ul className="navigation__menu">
								<li className="navigation__options">
									<Link to="/" className="navigation__options">HOME</Link>
								</li>
								<li className="navigation__options">
									<Link to="/missions" className="navigation__options">MISSIONS</Link>
								</li>
								<li className="navigation__options">
									<Link to='/rocket' className="navigation__options">ROCKETS</Link>
								</li>
							</ul>
						</div>
					</div>
				</Headroom>
				<Switch>
					<Route path='/missions'>
						< PreviousLaunch />
					</Route>
					<Route path='/rocket' exact component={Falconnine}></Route>
					<Route path='/launch/:id' component={Launch}></Route>
						{/* < Falconnine /> */}
						{/* < FalconHeavy /> */}
						{/* < Starship /> */}
					<Route path='/'>
						< LandingPage />
						< LatestLaunch />
					</Route>
					{/* <Route path="/launch/:id" component={Launch}></Route> */}
				</Switch>
			</Router>
		</div>
	);
}

export default App;