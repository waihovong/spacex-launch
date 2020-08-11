import React, { useState, useEffect } from 'react';
import  { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import '../App.css'


export default function PreviousLaunch() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [prevLaunch, setPrevLaunch] = useState([]);
    const [launchPad, setLaunchPad] = useState([]);
    const [rockets, setRockets] = useState([]);
 
    useEffect(() => {
        fetchSpaceX();
        async function fetchSpaceX() {
            try {
            const url = "https://api.spacexdata.com/v4/launches/past"            
            const response = await fetch(url);
            const data = await response.json();
            setPrevLaunch(data.reverse())

            const url2 = "https://api.spacexdata.com/v4/launchpads"
            const response2 = await fetch(url2);
            const data2 = await response2.json();
            setLaunchPad(data2);

            const url3 = "https://api.spacexdata.com/v4/rockets"
            const response3 = await fetch(url3);
            const data3 = await response3.json();
            setRockets(data3);

            setIsLoaded(true);
            } catch (error) {
                setIsLoaded(false);
                setError(error);
            }
        }
    }, []);

    if(error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div className="loading-progress"> <CircularProgress color="secondary" /></div>
        } else {
            return (
                <div>
                    <div className="previous-background">
                        <div className="container-header-title">
                            <div className="container-inner">
                                <h2 className="header-inner">MISSIONS</h2>
                            </div>
                        </div>
                    </div>
                    <div className="launch-container">
                        <div className="mission-details mission-container">
                            <div className="previous-mission-container">
                                {prevLaunch.map((prev, index) =>
                                    <div key={index} className="previous-launch-container">
                                        <div className="previous-upper-container">
                                            <div className="previous-launch-time">
                                                <span className="previous--format">{new Date (prev.date_utc).toLocaleDateString()}</span>
                                            </div>
                                            <div className="previous-launch-launchpad">
                                                {launchPad.map((launchP, index) => {
                                                    if(launchP.id === prev.launchpad) {
                                                        return <div key={index}>
                                                                <span className="previous--launchpad--type previous--format">{launchP.name}</span>
                                                                </div>
                                                        }
                                                    }
                                                )}
                                            </div>
                                            <div className="previous-launch-rocket">
                                                {rockets.map((rocketID, index) => {
                                                    if(rocketID.id === prev.rocket) {
                                                        return <div key={index}>
                                                                <span className="previous--rocket--type previous--format">{rocketID.name}</span>
                                                                </div>
                                                        }
                                                    }
                                                )}
                                            </div>
                                            <div className="previous-launch-more">
                                                <Link to={`/launch/${prev.id}`} className="previous--more">
                                                    <span className="previous--format previous--more">MORE DETAILS</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="previous-lower-container">
                                            <div className="previous-launch-flightnumber">
                                                <span className="flight--number--format"></span><span className="previous--format previous-flightnumber">{prev.flight_number}</span>
                                            </div>
                                            <div className="previous-launch-mission-patch">
                                                <img src={prev.links.patch.small || null }
                                                className="patch"
                                                alt={prev.flight_number + " Mission Patch"}
                                                />
                                            </div>
                                            <div className="previous-right-container">
                                                <div className="previous-launch-name">
                                                    <div className="previous-launch-status">

                                                        <span className={prev.success ? 'status-success statusbar' : 'status-fail statusbar'}>{ (prev.success) ? ' SUCCESSFUL ' : ' FAILURE '}</span>
                                                    </div>
                                                    <span className="previous--format previous--name">{prev.name}</span>
                                                </div>
                                                <div className="previous-launch-details">
                                                    <span className="previous--format previous--details">{prev.details ? prev.details : 'No Mission Details'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                )}
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}