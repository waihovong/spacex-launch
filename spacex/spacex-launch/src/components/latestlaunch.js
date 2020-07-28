import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import wikipediaLink from '../../src/assets/images/wikipedia.svg'
import redditLink from '../../src/assets/images/reddit-color.svg'
import presskitLink from '../../src/assets/images/audit-report-survey.svg'
import articleLink from '../../src/assets/images/computer-laptop.svg'
import youtubeLink from '../../src/assets/images/youtube.svg';
import SpaceX from '../../src/assets/images/SpaceX-Logo.svg';
import falcon from '../../src/assets/images/spacex-falcon9.jpg';
import '../App.css'

import ReactPlayer from 'react-player';

export default function UpcomingLaunch() {
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
                console.log(data);
                console.log(data2);
                console.log(data3);
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
                        <h3 className="upcoming--details">LATEST MISSION DETAILS</h3>
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
                                <span className="flight__success flight__format">{String(launch.success) ? ' SUCCESSFUL ' : ' FAILED '}</span>
                            </div>
                            <div className="flight--section flight__date__realtime">
                                <p className="flight__format flight__date flight--header"> DATE</p>
                                <span className="flight__date flight__format">{new Date (launch.date_utc).toDateString()}</span>
                            </div>
                            <div className="flight--section flight__date__realtime">
                                <p className="flight__format flight__date flight--header">ROCKET</p>
                                <div>
                                    {rockets.map((rocketID, index) => {
                                        if(rocketID.id === launch.rocket) {
                                            return <div>
                                                <span className="flight__format">{rocketID.name}</span>
                                                </div>
                                        }
                                    }
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flight--section flight__site__realtime">
                            <p className="flight__format flight__site flight--header">LAUNCH SITE </p>
                            <div className="flight__site">
                            {launchPad.map((launchP, index) => {
                                if(launchP.id === launch.launchpad) {
                                    return <div key={index} className="flight__site">
                                            <span className="launch--site">{launchP.full_name}</span>
                                            </div>
                                    }
                                }
                            )}
                            </div>
                        </div>
                        <span className="line--format latest--line"><hr/></span>
                    </div>
                        <div className="mission-container mission-debrief">
                            <p className="launch--details launch--format next-details"> {launch.details} </p>
                        </div>
                        {/* <div className="mission-patch">
                            <div className="seperator">
                                <img src={launch.links.patch.small || SpaceX }
                                    className="patch"
                                    alt="mission patch"
                                />
                            </div>
                        </div> */}
                    <div className="mission-container player-wrapper">
                        <h3 className="upcoming--details latest-replay">MISSION REPLAY</h3>
                        <div className="launch-container react-player">
                            <ReactPlayer 
                                url={launch.links.webcast} 
                                controls 
                                width='100vw' 
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
                    {/* <div className="mission-container">
                        <h2 className="launch--recap mission--header">Mission Details</h2>
                        <div className="mission-links">
                            <a  href={launch.links.wikipedia} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mission--details">
                                <img src={wikipediaLink}
                                    alt="wikipedia"
                                    className="link-images"
                                />
                                wikipedia
                            </a>
                            <a  href={launch.links.presskit} 
                                target="_blank"
                                rel="noopener noreferrer"
                                alt="presskit"
                                className="mission--details">
                                <img src={presskitLink}
                                    alt="press kit"
                                    className="link-images"
                                />
                                presskit
                            </a>
                            <a  href={launch.links.reddit.launch} 
                                target="_blank"
                                rel="noopener noreferrer"
                                alt="reddit-launch"
                                className="mission--details">
                                <img src={redditLink}
                                    alt="reddit launch"
                                    className="link-images"
                                />
                                reddit launch
                            </a>
                            <a  href={launch.links.article} 
                                target="_blank"
                                rel="noopener noreferrer"
                                alt="article"
                                className="mission--details">
                                <img src={articleLink}
                                    alt="article"
                                    className="link-images"
                                />
                                article
                            </a>
                            <a  href={launch.links.webcast} 
                                target="_blank"
                                rel="noopener noreferrer"
                                alt="webcast"
                                className="mission--details">
                                <img src={youtubeLink}
                                    alt="webcast-replay"
                                    className="link-images"
                                />
                                replay
                            </a>
                        </div>
                    </div> */}
                </div>
            </div>
            </div>
        );
    }
}