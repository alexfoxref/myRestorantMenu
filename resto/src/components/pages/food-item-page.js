import React, {Component} from 'react';
import {connect} from 'react-redux';
import WithRestoService from '../hoc/';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './food-item-page.scss';
import { NoMatchPage } from './';


class FoodItem extends Component {

    componentDidMount() {
        const {RestoService, menuLoaded, menuRequested, menuError} = this.props;

        menuRequested();

        RestoService.getMenuItems()
            .then(res => menuLoaded(res))
            .catch(err => menuError(err));
    }

    render() {
        const {menuItems, loading, errorMessage, selectedItem, addedToCart} = this.props;
        
         
        let title = '', 
            price = '', 
            url = '', 
            category = '',
            description = 'Vivamus accumsan quis risus rhoncus finibus. Fusce condimentum tincidunt mollis. Ut eu nulla gravida tortor volutpat fringilla. Morbi et consectetur nulla, sed venenatis lectus. Nullam non eleifend neque, ut vehicula elit. Nulla faucibus mauris justo, in congue quam pulvinar a. Cras a ultrices nunc. Vestibulum at velit tincidunt, vehicula nisl et, mattis sem.';
        
        if (menuItems.length > 0) {
            if (typeof +selectedItem === 'number' && selectedItem > 0 && selectedItem <= menuItems.length && +selectedItem === Math.floor(+selectedItem)) {
                title = menuItems[+selectedItem-1].title;
                price = menuItems[+selectedItem-1].price;
                category = menuItems[+selectedItem-1].category;
                url = menuItems[+selectedItem-1].url;
            } else {
                return <NoMatchPage />
            }
        }

        if (loading) {
            return <Spinner />
        }
        
        if (errorMessage) {
            return <Error errorMessage={errorMessage} />
        }

        return (
            <div style={{width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <div className="food__item">
                    <div className="menu__title">{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">
                        Category: <span>{category}</span>
                    </div>
                    <div className="menu__price">Price: <span>{price}$</span></div>
                    <div className="menu__description">Description:<span>{description}</span></div>
                    <button 
                        onClick={() => {addedToCart(+selectedItem)}}
                        className="menu__btn">
                            Add to cart
                    </button>
                </div>
            </div>
        )
    }
    
}

const mapStateToProps = (state) => {
    const {menu, loading, errorMessage} = state;

    return {
        menuItems: menu,
        loading,
        errorMessage
    }
};

const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError,
    addedToCart
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(FoodItem));