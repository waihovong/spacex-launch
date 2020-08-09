import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import '../App.css'

import falconH from '../../src/assets/images/spacex-falconH-3.jpg';



export default function UpcomingLaunch() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false);
    const [rocket, setRocket] = useState([]);
    const [toggleStatus, setToggleStatus] = useState(0);

    useEffect(() => {
        fetchSpaceX();
        async function fetchSpaceX() {
            try {
            const url = "https://api.spacexdata.com/v3/rockets/falconheavy";
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
                        <div className="rocket-side-containerR">
                            <img src={falconH}
                                alt="falcon9 rocket"
                                className="rocket-side-image">
                            </img>
                        </div>
                        <div className="rocket-side-containerL">
                            <div className="rocket-side-containerL-format">
                            {toggleStatus === 0 && 
                                <div>
                                    <h3 className="additional-overview overview">Technical details</h3>
                                </div>
                                }
                                {toggleStatus === 1 &&
                                <div>
                                    <h3 className="additional-overview overview">First Stage</h3>
                                </div>
                                }
                                {toggleStatus === 2 &&
                                <div>
                                    <h3 className="additional-overview overview">Second Stage</h3>
                                </div>
                            }
                                <h2 className="rocket--name">{rocket.rocket_name}</h2>
                                <p className="rocket--text next-details">{rocket.description}</p>
                                <div className="rocket-header">
                                    <h3 onClick={() => setToggleStatus(0)} className={toggleStatus ? "highlight additional-overview" : "highlight additional-overview"}>TECHNICAL DETAILS</h3>
                                    <span className="seperator">|</span>
                                    <h3 onClick={() => setToggleStatus(1)} className={toggleStatus ? "highlight additional-overview" : "highlight additional-overview"}>FIRST STAGE</h3>
                                    <span className="seperator">|</span>
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
                                        <div className="overview-table overview-table-left">
                                            <div className="overview-table-right">
                                                <p className="rocket--description">MASS</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.mass.kg).toLocaleString()}</span>&nbsp;<span className="rocket--dimensions--met">kg</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="overview-table overview-table-left">
                                            <div className="rocket-payload-info">
                                            {rocket.payload_weights.map((payload,index)=>
                                                <div key={payload.id} className="overview-table-payload">
                                                    <ul className="overview-table">
                                                        <span className="rocket--description">PAYLOAD TO <span className="rocket--payload"> {payload.id}</span></span>
                                                        <li className="rocket--classification"> <span className="rocket--classification--met">{(payload.kg).toLocaleString()}</span> <span className="rocket--dimensions--met">&nbsp;kg</span></li>
                                                    </ul>
                                                </div>
                                            )}
                                            </div>
                                    </div>
                                </div>}
                            <div className="first-stage-description">
                                {toggleStatus === 1 &&
                                <div className="rocket-stages-overview">
                                    <div className="rocket-payload-info">
                                        <div className="rocket-stages">
                                            <div className="overview-table">
                                                <p className="rocket--description">ENGINES</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{rocket.first_stage.engines}</span></p>
                                            </div>
                                            <div className="overview-table">
                                                <p className="rocket--description">THRUST AT <span className="rocket--payload rocket--name">SEA LEVEL</span></p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.first_stage.thrust_sea_level.kN).toLocaleString()}</span> <span className="rocket--dimensions--met">&nbsp;kN</span></p>
                                            </div>
                                            <div className="overview-table">
                                                <p className="rocket--description">THRUST IN <span className="rocket--payload rocket--name">VACUUM</span></p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{(rocket.first_stage.thrust_vacuum.kN).toLocaleString()}</span> <span className="rocket--dimensions--met">&nbsp;kN</span></p>
                                            </div>
                                            <div className="overview-table">
                                                <p className="rocket--description">BURN TIME</p>
                                                <p className="rocket--classification"><span className="rocket--classification--met">{rocket.first_stage.burn_time_sec} </span><span className="rocket--dimensions--met">&nbsp;sec</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
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
                            {/* <div className="read-more">
                                <a href={rocket.wikipedia} className="rocket--description mission--details read-more-button">READ MORE</a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
