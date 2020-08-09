import React, { useState, useEffect } from "react";

import "../App.css";

export default function LandingPage() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [nextLaunch, setNextLaunch] = useState([]);
	const [launchPad, setLaunchPad] = useState([]);

	useEffect(() => {
		fetchNextLaunch();
		async function fetchNextLaunch() {
			try {
				const url = "https://api.spacexdata.com/v4/launches/next?limit=2"
				const url2 = "https://api.spacexdata.com/v4/launchpads"
				const response = await fetch(url);
				const response2 = await fetch(url2);
				const data = await response.json();
				const data2 = await response2.json();
				setNextLaunch(data);
				setLaunchPad(data2);
				setIsLoaded(true);
			} catch (error) {
				setIsLoaded(false);
				setError(error);
			}
		}
	}, []);
	return (
		<div className="landing-container">
			<div>
				<div className="landing-separator">
				<div className="mission--next mission-container">
					<div className="next-header upcoming-header">
						<h3 className="upcoming--launch upcoming--details">UPCOMING MISSION</h3>
						<h2 className="launch--recap upcoming--launch__name upcoming--details">{nextLaunch.name}</h2>
					</div>
				</div>
				<div className="next-header next-mission mission-container line--format">
					<div className="flight-mission">
						<h3 className="upcoming--launch upcoming--flightnum upcoming--details">FLIGHT: #{nextLaunch.flight_number}</h3>
						<div className="flight__site__realtime">
                                <div className="upcoming--details">
                                {launchPad.map((launchP, index) => {
									if(launchP.id === nextLaunch.launchpad) {
                                        return <div key={index} className="upcoming--details">
                                                <h3 className="upcoming--details">{launchP.name}</h3>
                                                </div>
                                        }
                                    }
									)}
							</div>
						</div>
						<h3 className="upcoming--launch upcoming--details">{new Date (nextLaunch.date_utc).toDateString()}</h3>
					</div>
					<hr/>
					<span className="next-details">{nextLaunch.details ? nextLaunch.details : 'No Mission Details' }</span>
				</div>
				</div>
			</div>
		</div>
	);
}
