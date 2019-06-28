import React from 'react';
import Background from '../app/food-bg.jpg';
import {Link} from 'react-router-dom';
import './no-match-page.scss';

const NoMatchPage = () => {
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="no-match-page">
            <Link to="/">
                <button> Main Page </button>
            </Link>
        </div>
    )
}

export default NoMatchPage;