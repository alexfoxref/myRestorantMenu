import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart, plusCount, minusCount, postData, toggleModal, menuRequested} from '../../actions';
import Modal from '../modal';
import {View} from '../menu-list';

const CartTable = ({items, deleteFromCart, minusCount, plusCount, postData, total, toggleModal, loading, errorMessage, menuRequested}) => {
    menuRequested(false);

    const cartTable = () => {
        return (
            <>
                <button 
                    className="cart__order-btn"
                    onClick={() => {
                        if (items.length !== 0) {
                            const order = items.map(item => {
                                const {title, id, price, number} = item;
                                return {id, title, number, price};
                            });
                            const time = new Date();
                            const getZero = (date) => {
                                return `${date}`.length === 1 ? `0${date}` : date
                            };
                            const fullOrder = order.concat({
                                total,
                                time: `${getZero(time.getDate())}/${getZero(time.getMonth() + 1)}/${time.getFullYear()} ${time.getHours()}:${getZero(time.getMinutes())}:${getZero(time.getSeconds())}`
                            });
                            postData('/orders/', fullOrder);
                        } else {
                            toggleModal('Please select your menu.')
                        }
                    }}>
                        To order
                </button>
                <div className="cart__title">Your order:</div>
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
                <Modal/>
            </>
        );
    }

    return  <View
                error={errorMessage}
                loading={loading}
                success={cartTable}/>
};

const mapStateToProps = ({items, total, loading, errorMessage}) => {
    return {
        items,
        total,
        loading,
        errorMessage
    }
};

const mapDispatchToProps = {
    deleteFromCart,
    plusCount,
    minusCount,
    postData,
    toggleModal,
    menuRequested
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);