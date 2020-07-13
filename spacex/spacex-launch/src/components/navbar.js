import React from 'react';
import '../App.css'

export default function Navbar() {
    return (
        <div className="navigation-bar">
            <div className="navigation__container">
                <h1 className="navigation-header">SpaceX Launch</h1>
                <ul className="navigation__menu">
                    {/* this is going to link to another page or scrollable down below */}
                    <li className="navigation__options">Launches</li>
                    <li className="navigation__options">Recovery</li>
                    <li className="navigation__options">Missions</li>
                    <li className="navigation__options">Cores</li>
                </ul>
            </div>
        </div>
    );
}