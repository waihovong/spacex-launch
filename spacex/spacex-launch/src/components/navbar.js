import React from 'react';
import '../App.css'

export default function Navbar() {
    return (
        <div className="navigation-bar">
            <div className="navigation__container">
                <ul className="navigation__menu">
                    <li className="navigation__options">LAUNCHES</li>
                    <li className="navigation__options">RECOVERY</li>
                    <li className="navigation__options">MISSIONS</li>
                    <li className="navigation__options">CORES</li>
                </ul>
            </div>
        </div>
    );
}