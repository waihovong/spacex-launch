import React from 'react';
import  {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import '../App.css'

export default function Navbar() {
    return (
        <div className="navigation-container">
            <div className="navigation-container-inner">
                <ul className="navigation__menu">
                    <li className="navigation__options">
                        <Link to="/" className="navigation__options">HOME</Link>
                    </li>
                    <li className="navigation__options">
                        <Link to="/missions" className="navigation__options">MISSIONS</Link>
                    </li>
                    <li className="navigation__options">
                        <Link to='/rocket/falcon9' className="navigation__options">FALCON 9 </Link>
                    </li>
                    <li className="navigation__options">
                        <Link to='/rocket/falconheavy' className="navigation__options">FALCON HEAVY</Link>
                    </li>
                    <li className="navigation__options">
                        <Link to='/rocket/starship' className="navigation__options">STARSHIP </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}