import React from 'react';
import '../App.css'

export default function Navbar() {
    return (
        <div className="navigation-bar">
            <div className="navigation__container">
                <h1 className="navigation-header">SpaceX Launch</h1>
                <ul className="navigation__menu">
                    {/* this is going to link to another page or scrollable down below */}
                    <li className="navigation__options">LAUNCHES</li>
                    <li className="navigation__options">RECOVERY</li>
                    <li className="navigation__options">MISSIONS</li>
                    <li className="navigation__options">CORES</li>
                </ul>
            </div>
        </div>
    );
}