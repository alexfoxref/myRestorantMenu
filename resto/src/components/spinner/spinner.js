import React from 'react';
import Background from '../app/food-bg.jpg';

const Spinner = () => {
    return  <div 
                style={{width: '100%', height: '100%', color: 'white', background: `url(${Background}) center center/cover no-repeat`, position:'absolute', top:'60px'}} 
                className="spinner">
                    loading...
            </div>
}

export default Spinner;