import React, { useState, useEffect } from 'react';
import '../App.css'
import { CircularProgress } from '@material-ui/core';
import wikipediaLink from '../../src/assets/images/wikipedia.svg'
import redditLink from '../../src/assets/images/reddit-color.svg'
import presskitLink from '../../src/assets/images/audit-report-survey.svg'
import articleLink from '../../src/assets/images/computer-laptop.svg'

export default function UpcomingLaunch() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [launch, setLaunch] = useState([]);
    useEffect(() => {
        fetchSpaceX();
        async function fetchSpaceX() {
            try {
            const url = "https://api.spacexdata.com/v4/launches/latest"
                const response = await fetch(url);
                const data = await response.json();
                setLaunch(data);
                setIsLoaded(true);
                console.log(data);
                console.log(data.links.wikipedia);
                console.log(data.links.presskit);
                console.log(data.links.article);
                console.log(data.links.reddit.launch);
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
            <div className="main-container">
                <div className="launch-container">
                    <div className="mission-details mission-container">
                        <h1 className="latest__launch launch--recap launch--format">Latest Mission -&nbsp;</h1>
                        <h1 className="mission__name launch--recap">{launch.name}</h1>
                        <h3 className="flight__number launch--recap"> Flight Number:  #{launch.flight_number} </h3>
                    </div>
                    <div className="mission-description mission-container">
                        <div className="mission-debrief">
                            <p className="launch--details launch--format"> Details {launch.details} </p>
                        </div>
                        <div className="mission-patch">
                            <div className="seperator">
                                <img src={launch.links.flickr.original[0]}
                                    className="patch"
                                    alt="mission patch"
                                />
                                {launch.links.patch.small}
                            </div>
                        </div>
                        <div className="flight-details">
                            <p className="flight__date">LAUNCH DATE: {new Date (launch.date_utc).toUTCString()}</p>
                            <p className="flight__site">LAUNCH SITE: {launch.launchpad}</p>
                            {launch.cores.map((core,index) => {
                                if(core.landing_success) {
                                    return <div key={index}>
                                        <p 
                                        className="flight__success">
                                        LANDING SUCCESS: 
                                        {String(core.landing_success) ? ' Successful ' : ' Failed '}
                                        </p>
                                    </div>
                                }
                            }
                            )}
                        </div>
                    </div>
                    <div className="mission-container">
                        <h1 className="gallery launch--recap mission--header">Mission Gallery</h1>
                        <div className="gallery-container">
                        {launch.links.flickr.original.map((gallery,index)=>
                            <a key={index} href={gallery} target="_blank" rel="noopener noreferrer">
                                <img key={index}
                                    src={gallery}
                                    alt={launch.flight_number}
                                    className="flight-image"
                                    />
                            </a>
                            )}
                        </div>
                    </div>
                    <div className="mission-container">
                        <h1 className="launch--recap mission--header">Mission Details</h1>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}