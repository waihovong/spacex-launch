import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../App.css'
// import falconHeavy from '../../src/assets/images/57238.png';
import dragon from '../../src/assets/images/spacex-dragon2.jpg';



export default function UpcomingLaunch() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [rocket, setRocket] = useState([]);
    const [toggleStatus, setToggleStatus] = useState(0);

    useEffect(() => {
        fetchSpaceX();
        async function fetchSpaceX() {
            try {
            const url = "https://api.spacexdata.com/v3/rockets/falcon9";
                const response = await fetch(url);
                const data = await response.json();
                setRocket(data);
                setIsLoaded(true);
                console.log(data);
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
            <div className="background-rocket">
                <div>
                    <div className="rocket-container">
                        <div className="rocket-side-containerL">
                            <div className="rocket-side-containerL-format">
                                <h2 className="rocket--name upcoming--launch__name">{rocket.rocket_name}</h2>
                                <p className="rocket--text next-details">{rocket.description}</p>
                                <div className="rocket-header">
                                    <h3 onClick={() => setToggleStatus(0)} className={toggleStatus ? "highlight additional-overview" : "highlight additional-overview"}>TECHNICAL DETAILS</h3>
                                    <h3 onClick={() => setToggleStatus(1)} className={toggleStatus ? "highlight additional-overview" : "highlight additional-overview"}>FIRST STAGE</h3>
                                    <h3 onClick={() => setToggleStatus(2)} className={toggleStatus ? "highlight additional-overview" : "highlight additional-overview"}>SECOND STAGE</h3>
                                </div>
                                {toggleStatus === 0 &&
                                <div>
                                    <div className="overview-container">
                                        <div className="overview-table overview-table-left">
                                            <div className="overview-table-right">
                                                <p className="rocket--description">HEIGHT</p>
                                                <p className="rocket--classification"> <span className="rocket--classification--met">{rocket.height.meters}</span>&nbsp;<span className="rocket--dimensions--met">m</span></p>
                                            </div>
                                        </div>
                                        <div className="overview-table overview-table-left">
                                            <div className="overview-table-right">
                                                <p className="rocket--description">MASS</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.mass.kg).toLocaleString()}</span>&nbsp;<span className="rocket--dimensions--met">kg</span></p>
                                            </div>
                                        </div>
                                        <div className="overview-table overview-table-left">
                                            <div className="overview-table-right">
                                                <p className="rocket--description">DIAMETER</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{rocket.diameter.meters}</span>&nbsp;<span className="rocket--dimensions--met">m</span></p>
                                            </div>
                                        </div>   
                                        <div className="overview-table overview-table-left">
                                            <div className="overview-table-right">
                                                <p className="rocket--description">STAGES</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{rocket.stages}</span></p>
                                            </div>
                                        </div>                        
                                    </div>
                                    <div className="overview-table overview-table-left">
                                            <div className="rocket-payload-info">
                                            {rocket.payload_weights.map((payload,index)=>
                                                <div className="overview-table-payload">
                                                    <ul key={index} className="overview-table">
                                                        <span className="rocket--description">PAYLOAD TO <span className="rocket--payload rocket--name"> {payload.id}</span></span>
                                                        <li className="rocket--classification"> <span className="rocket--classification--met">{(payload.kg).toLocaleString()}</span> <span className="rocket--dimensions--met">&nbsp;kg</span></li>
                                                    </ul>
                                                </div>
                                            )}
                                            </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="first-stage-description">
                                <div className="rocket-stages-overview">
                                    {toggleStatus === 1 &&
                                    <div className="rocket-payload-info">
                                        <div className="rocket-stages">
                                            <div className="overview-table">
                                                <p className="rocket--description">ENGINES</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{rocket.first_stage.engines}</span></p>
                                            </div>
                                            <div className="overview-table">
                                                <p className="rocket--description">THRUST AT SEA LEVEL</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.first_stage.thrust_sea_level.kN).toLocaleString()}</span> <span className="rocket--dimensions--met">&nbsp;kN</span></p>
                                            </div>
                                            <div className="overview-table">
                                                <p className="rocket--description">THRUST IN VACUUM</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.first_stage.thrust_vacuum.kN).toLocaleString()}</span> <span className="rocket--dimensions--met">&nbsp;kN</span></p>
                                            </div>
                                            <div className="overview-table">
                                                <p className="rocket--description">BURN TIME</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{rocket.first_stage.burn_time_sec} </span><span className="rocket--dimensions--met">&nbsp;sec</span></p>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                                <div className="second-stage-description">
                                {toggleStatus === 2 &&
                                    <div>
                                        <div className="rocket-stages-overview">
                                            <div className="rocket-payload-info">
                                                <div className="rocket-stages">
                                                    <div className="overview-table">
                                                        <p className="rocket--description">ENGINES</p>
                                                        <p className="rocket--classification"><span className="rocket--classification--met">{rocket.second_stage.engines}</span></p>
                                                    </div>
                                                    <div className="overview-table">
                                                        <p className="rocket--description">THRUST</p>
                                                        <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.second_stage.thrust.kN).toLocaleString()}</span> <span className="rocket--dimensions--met">&nbsp;kN</span></p>
                                                    </div>
                                                    <div className="overview-table">
                                                        <p className="rocket--description">BURN TIME</p>
                                                        <p className="rocket--classification"><span className="rocket--classification--met">{rocket.second_stage.burn_time_sec}</span> <span className="rocket--dimensions--met">&nbsp;sec</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>}
                            </div>
                        </div>
                        <div className="rocket-side-containerR">
                            <img src={dragon}
                                alt="falcon9 rocket"
                                className="rocket-side-image">
                            </img>
                        </div>
                    </div>
                    <div className="rocket-gallery">
                        <div className="rocket-gallery-name">
                            <h2 className="mission--header">{rocket.rocket_name} Gallery</h2>
                        </div>
                        <div className="rocket-images">
                        {rocket.flickr_images.map((gallery,index)=>
                            <a key={index} href={gallery} target="_blank" rel="noopener noreferrer">
                                <img key={index}
                                    src={gallery}
                                    alt={rocket.flight_number}
                                    className="flight-image"
                                    />
                            </a>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
