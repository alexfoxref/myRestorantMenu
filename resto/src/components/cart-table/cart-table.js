import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart, plusCount, minusCount} from '../../actions';

const CartTable = ({items, deleteFromCart, minusCount, plusCount}) => {
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {items.map(item => {
                    const {title, price, url, id, number} = item;
                    return (
                        <div key={id} className="cart__item">
                            <img src={url} className="cart__item-img" alt={title}></img>
                            <div className="cart__item-title">{title}</div>
                            <div className="cart__item-price">{price}$</div>
                            <div className="cart__item-counter">
                                <button 
                                    onClick={() => {
                                        if (number !== 1) {
                                            minusCount(id)
                                        } else {
                                            deleteFromCart(id)
                                        }
                                    }}
                                    className="cart__item-btn btn-minus">
                                        <span>-</span>
                                </button>
                                {number}
                                <button 
                                    onClick={() => {
                                        plusCount(id)    
                                    }}
                                    className="cart__item-btn btn-plus">
                                        <span>+</span>
                                </button>
                            </div>
                            <div className="cart__item-total">{price*number}$</div>
                            <div onClick={() => deleteFromCart(id)} className="cart__close">&times;</div>
                        </div>
                    )
                })}

                
            </div>
        </>
    );
};

const mapStateToProps = ({items}) => {
    return {
        items
    }
};

const mapDispatchToProps = {
    deleteFromCart,
    plusCount,
    minusCount
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);