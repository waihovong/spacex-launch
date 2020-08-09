import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../App.css'
import falcon from '../../src/assets/images/spacex-falcon9-2.jpg';

import falconImage from '../../src/assets/images/falcon9ren.png';


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
                <div className="falcon-background">
                    <div className="container-header-title">
                        <div className="container-inner">
                            <h2 className="header-inner falcon--header">FALCON 9</h2>
                        </div>
                    </div>
                    <div className="arrow-down"></div>
                </div>
                <div className="background-rocket-bottom">
                    <div className="rocket-container">
                        <div className="rocket-containerL">
                            <div className="rocket-overview">
                                <h2 className="overview--header">OVERVIEW</h2>
                                <div className="rocket-overview-format">
                                    <p className="rocket--text next-details">{rocket.description}</p>
                                </div>
                                <div className="shadow-button">
                                    <a href={rocket.wikipedia}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="button-format">
                                        <button className="read-button">
                                            Read more
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div className="rocket-containerL-lower">
                                <div className="rocket-containerL-first_stage">
                                    <div className="rocket-header">
                                        <h3 onClick={() => setToggleStatus(0)} className={toggleStatus ? " additional-overview" : "highlight additional-overview"}>FIRST STAGE</h3>
                                            <span className="seperator">|</span>
                                        <h3 onClick={() => setToggleStatus(1)} className={toggleStatus ? "highlight additional-overview" : "additional-overview"}>SECOND STAGE</h3>
                                    </div>
                                    {toggleStatus === 0 && 
                                    <div className="rocket-stages">
                                        <div className="overview-table">
                                            <p className="rocket--description">ENGINES</p>
                                            <p className="rocket--classification"><span className="rocket--classification--met">{rocket.first_stage.engines}</span></p>
                                        </div>
                                        <div className="overview-table">
                                            <p className="rocket--description">THRUST AT <span className="rocket--payload">SEA LEVEL</span></p>
                                            <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.first_stage.thrust_sea_level.kN).toLocaleString()}</span> <span>&nbsp;kN</span></p>
                                        </div>
                                        <div className="overview-table">
                                            <p className="rocket--description">THRUST IN <span className="rocket--payload">VACUUM</span></p>
                                            <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.first_stage.thrust_vacuum.kN).toLocaleString()}</span> <span>&nbsp;kN</span></p>
                                        </div>
                                        <div className="overview-table">
                                            <p className="rocket--description">BURN TIME</p>
                                            <p className="rocket--classification"><span className="rocket--classification--met">{rocket.first_stage.burn_time_sec} </span> <span>&nbsp;sec</span></p>
                                        </div>
                                    </div>}
                                    {toggleStatus === 1 && 
                                    <div className="rocket-stages">
                                        <div className="overview-table">
                                            <p className="rocket--description">ENGINES</p>
                                            <p className="rocket--classification"><span className="rocket--classification--met">{rocket.second_stage.engines}</span></p>
                                        </div>
                                        <div className="overview-table">
                                            <p className="rocket--description">THRUST</p>
                                            <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.second_stage.thrust.kN).toLocaleString()}</span> <span>&nbsp;kN</span></p>
                                        </div>
                                        <div className="overview-table">
                                            <p className="rocket--description">BURN TIME</p>
                                            <p className="rocket--classification"><span className="rocket--classification--met">{rocket.second_stage.burn_time_sec} </span> <span>&nbsp;sec</span></p>
                                        </div>
                                    </div>}
                                </div>
                            </div>

                        </div>
                        <div className="rocket-containerM">
                            <img src={falconImage}
                                alt="falcon9 rocket"
                                className="rocket-side-image">
                            </img>
                        </div>
                        <div className="rocket-containerR">
                            <h3 className='rocket--technical'>TECHNICAL DETAILS</h3>
                            <div className="overview-container">
                                <div className="rocket-stages">
                                    <div className="overview-table-right">
                                        <p className="rocket--description">HEIGHT</p>
                                        <p className="rocket--classification"> <span className="rocket--classification--met">{rocket.height.meters}</span>&nbsp;<span>m</span></p>
                                    </div>
                                </div>
                                <div className="overview-table-right">
                                    <div className="overview-table-right">
                                        <p className="rocket--description">DIAMETER</p>
                                        <p className="rocket--classification"><span className="rocket--classification--met">{rocket.diameter.meters}</span>&nbsp;<span>m</span></p>
                                    </div>
                                </div>                      
                                <div className="overview-table-right">
                                    <div className="overview-table-right">
                                        <p className="rocket--description">MASS</p>
                                        <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.mass.kg).toLocaleString()}</span>&nbsp;<span>kg</span></p>
                                    </div>
                                </div>
                                <div className="overview-table-payload">
                                    <div className="overview-table-right">
                                    {rocket.payload_weights.map((payload,index)=>
                                        <div key={payload.id} className="overview-table-payload">
                                            <ul className="overview-table overview-table-right">
                                                <span className="rocket--description">PAYLOAD TO <span className="rocket--payload rocket--name"> {payload.id} </span></span>
                                                <li className="rocket--classification"> <span className="rocket--classification--met">{(payload.kg).toLocaleString()}</span> <span>&nbsp;kg</span></li>
                                            </ul>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                <div className="overview-table-right">
                                    <div className="overview-table-right">
                                        <p className="rocket--description">STAGES</p>
                                        <p className="rocket--classification"><span className="rocket--classification--met">{rocket.stages}</span></p>
                                    </div>
                                </div>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}