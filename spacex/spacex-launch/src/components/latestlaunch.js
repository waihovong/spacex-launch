import React, { useState, useEffect } from 'react';
import Navbar from './navbar'
import CircularProgress from '@material-ui/core/CircularProgress';
import wikipediaLink from '../../src/assets/images/wikipedia.svg'
import redditLink from '../../src/assets/images/reddit-color.svg'
import presskitLink from '../../src/assets/images/audit-report-survey.svg'
import articleLink from '../../src/assets/images/computer-laptop.svg'

import '../App.css'

import ReactPlayer from 'react-player';

export default function LatestLaunch() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [launch, setLaunch] = useState([]);
    const [launchPad, setLaunchPad] = useState([]);
    const [rockets, setRockets] = useState([]);

    useEffect(() => {
        fetchSpaceX();
        async function fetchSpaceX() {
            try {
            const url = "https://api.spacexdata.com/v4/launches/latest"
            const url2 = "https://api.spacexdata.com/v4/launchpads"
            const url3 = "https://api.spacexdata.com/v4/rockets"
                const response = await fetch(url);
                const response2 = await fetch(url2);
                const response3 = await fetch(url3);
                const data = await response.json();
                const data2 = await response2.json();
                const data3 = await response3.json();
                setLaunch(data);
                setLaunchPad(data2);
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
            <div className="background">
            <div className="second-container">
                <div className="launch-container">
                    <div className="mission-details mission-container">
                        <h3 className="upcoming--details latest--header">LATEST MISSION DETAILS</h3>
                        <div className="latest-mission-container">
                            <div className="latest--format--line">
                                <div className="latest-launch-name">
                                    <h2 className="upcoming--launch__name latest--launch"><span>{launch.name}</span></h2>
                                </div>
                            </div>
                            <div>
                                <h2 className="flight__number launch--recap">{launch.flight_number} </h2>
                            </div>
                        </div>
                    </div>
                    <div className="mission-description mission-container">
                        <div className="flight-details">
                            <div className="flight--section flight__success__realtime">
                                <p className="flight__format flight__success flight--header">STATUS</p>
                                <span className={launch.success ? 'status-success statusbar' : 'status-fail statusbar'}>{ (launch.success) ? ' SUCCESSFUL ' : ' FAILURE '}</span>
                            </div>
                            <div className="flight--section flight__date__realtime">
                                <p className="flight__format flight__date flight--header"> DATE</p>
                                <span className="flight__date flight__format next-details">{new Date (launch.date_utc).toDateString()}</span>
                            </div>
                            <div className="flight--section flight__date__realtime">
                                <p className="flight__format flight__date flight--header">ROCKET</p>
                                <div>
                                    {rockets.map((rocketID, index) => {
                                        if(rocketID.id === launch.rocket) {
                                            return <div key={index}>
                                                <span className="flight__format next-details">{rocketID.name}</span>
                                                </div>
                                        }
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flight--kit">
                            <div className="flight--section flight__site__realtime">
                                <p className="flight__format flight__site flight--header">LAUNCH SITE </p>
                                <div className="flight__site">
                                {launchPad.map((launchP, index) => {
                                    if(launchP.id === launch.launchpad) {
                                        return <div key={index} className="flight__site">
                                                <span className="launch--site next-details">{launchP.full_name}</span>
                                                </div>
                                        }
                                    }
                                )}
                                </div>
                            </div>
                            <div className="mission-links">
                                <ul className="mission-navigate-extra">
                                    <li><a  href={launch.links.wikipedia} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mission--details">
                                        <img src={wikipediaLink}
                                            alt="wikipedia"
                                            className="link-images"
                                        />
                                    </a></li>
                                    <li><a  href={launch.links.presskit} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        alt="presskit"
                                        className="mission--details">
                                        <img src={presskitLink}
                                            alt="press kit"
                                            className="link-images press-images"
                                        />
                                    </a></li>
                                    <li><a  href={launch.links.reddit.launch} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        alt="reddit-launch"
                                        className="mission--details">
                                        <img src={redditLink}
                                            alt="reddit launch"
                                            className="link-images"
                                        />
                                    </a></li>
                                    <li><a  href={launch.links.article} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        alt="article"
                                        className="mission--details">
                                        <img src={articleLink}
                                            alt="article"
                                            className="link-images"
                                        />
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                        <span className="line--format latest--line"></span>
                    </div>
                        <div className="mission-container mission-debrief">
                            <p className="launch--details launch--format next-details"> {launch.details} </p>
                        </div>
                    <div className="mission-container player-wrapper">
                        <h3 className="upcoming--details latest--header mission--replay">MISSION REPLAY</h3>
                        <div className="launch-container react-player">
                            <ReactPlayer 
                                url={launch.links.webcast} 
                                controls 
                                width='100vh' 
                                height='60vh'
                            />
                        </div>
                    </div>
                    <div className="mission-container">
                        <div className="gallery-container">
                            {launch.links.flickr.original.map((gallery,index)=>
                                <a key={index} href={gallery} target="_blank" rel="noopener noreferrer" className="image-link">
                                    <img
                                        src={gallery}
                                        alt={launch.flight_number}
                                        className="flight-image"
                                    />
                                </a>
                            )}
                        </div>
                        <span className="underline"><hr /></span>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}