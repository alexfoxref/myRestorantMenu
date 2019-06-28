import React from 'react';
import {Route, Switch} from 'react-router-dom';

import MainPage from './main-page';
import CartPage from './cart-page';
import NoMatchPage from './no-match-page';

const routerConfig = [
    {
        path: '/',
        component: MainPage,
        exact: true
    },
    {
        path: '/cart/',
        component: CartPage,
        exact: true
    }
];

const routerItems = routerConfig.map(item => {
    const {path, component, exact} = item;

    return (
        <Route exact={exact} path={path} component={component} key={path}/>
    )
});

const matchPath = routerConfig.filter((item) => {
    const {path} = item;
    const location = window.location.pathname;
    const browserPath = (location[location.length-1] === '/') ? location : `${location}/`;
    return (path === browserPath)
}).map(item => item.path);

console.log(matchPath.length)

const noMatchPage = (matchPath.length !== 0) ? null : NoMatchPage;

const Pages = () => {
    return (
        <Switch>
            {routerItems}
            <Route component={noMatchPage}/>
        </Switch>
    )
};

export default Pages;

export {
    MainPage,
    CartPage,
    NoMatchPage
};