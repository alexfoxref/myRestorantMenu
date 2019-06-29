import React from 'react';
import Pages from '../pages';
import AppHeader from '../app-header';

import Background from './food-bg.jpg';

const App = () => {

    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={50}/>
            <Pages/>
        </div>
    )
}

export default App;