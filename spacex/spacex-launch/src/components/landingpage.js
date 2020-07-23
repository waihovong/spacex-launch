import React, { useState, useEffect } from "react";
import SpaceX from '../../src/assets/images/SpaceX-Logo.svg';
import Headroom from 'react-headroom';
import "../App.css";

export default function LandingPage() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [nextLaunch, setNextLaunch] = useState([]);

	useEffect(() => {
		fetchNextLaunch();
		async function fetchNextLaunch() {
			try {
				const url = "https://api.spacexdata.com/v4/launches/next?limit=2"
				const response = await fetch(url);
				const data = await response.json();
				setNextLaunch(data);
				setIsLoaded(true);
				// console.log(data);
			} catch (error) {
				setIsLoaded(false);
				setError(error);
			}
		}
	}, []);
	return (
		<div className="landing-container">
			<div>
				<div className="navigation-bar">
					<Headroom>
					<div className="navigation__container">
						<img src={SpaceX}
							alt="spacex logo"
							className="navigation-header"
							/>
						<ul className="navigation__menu">
							<li className="navigation__options">LAUNCHES</li>
							<li className="navigation__options">RECOVERY</li>
							<li className="navigation__options">MISSIONS</li>
							<li className="navigation__options">CORES</li>
						</ul>
					</div>
					</Headroom>
				</div>
				<div className="landing-separator">
				<div className="mission--next mission-container">
					<div className="next-header upcoming-header">
						<h3 className="upcoming--launch upcoming--details">UPCOMING LAUNCH</h3>
						<h2 className="launch--recap upcoming--launch__name upcoming--details">{nextLaunch.name}</h2>
					</div>
				</div>
				<div className="next-header next-mission mission-container line--format">
					<div className="flight-mission">
						<h3 className="upcoming--launch upcoming--flightnum upcoming--details">FLIGHT: #{nextLaunch.flight_number}</h3>
						<h3 className="upcoming--launch upcoming--details">{new Date (nextLaunch.date_utc).toDateString()}</h3>
					</div>
					<hr/>
					<span className="next-details">{nextLaunch.details}</span>
				</div>
				</div>
			</div>
		</div>
	);
}
