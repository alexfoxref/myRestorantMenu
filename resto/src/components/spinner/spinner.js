import React from 'react';
import Background from '../app/food-bg.jpg';

const Spinner = () => {
    return  <div 
                style={{width: '100vw', height: '100vh', color: 'white', background: `url(${Background}) center center/cover no-repeat`}} 
                className="spinner">
                    loading...
            </div>
}

export default Spinner;