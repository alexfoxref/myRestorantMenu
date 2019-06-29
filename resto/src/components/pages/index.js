import React from 'react';
import {Route, Switch} from 'react-router-dom';
import FoodItem from './food-item-page';

import MainPage from './main-page';
import CartPage from './cart-page';
import NoMatchPage from './no-match-page';


const foodItem = (id) => {
    return (
        <FoodItem 
            selectedItem={id}/>
    )
};

const dynamicItem = (match) => {
    const {id} = match.params;

    return foodItem(id)
};

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
    },
    {
        path: '/:id',
        component: ({match}) => dynamicItem(match),
        exect: true
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
    NoMatchPage,
    FoodItem
};