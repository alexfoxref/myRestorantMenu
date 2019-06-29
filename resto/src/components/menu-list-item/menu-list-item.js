import React from 'react';
import './menu-list-item.scss';

const MenuListItem = ({menuItem, categoryImg, onItemSelected}) => {
    const {title, price, url, category, id} = menuItem;
    
    return (
        <li className="menu__item">
            <div className="menu__title">{title}</div>
            <img className="menu__img" src={url} alt={title}></img>
            <div className="menu__category">
                Category: <span>{category}</span>
                <img className="menu__category-img" src={categoryImg} alt={category}></img>
            </div>
            <div className="menu__price">Price: <span>{price}$</span></div>
            <button className="menu__btn">Add to cart</button>
            <button 
                style={{marginLeft: '10px'}} 
                className="menu__btn"
                onClick={() => onItemSelected(id)}
                    >Show more...
            </button>
        </li>
    )
}

export default MenuListItem;