import React from 'react';
import {connect} from 'react-redux';
import {toggleModal} from '../../actions';
import './modal.scss';

const Modal = ({modal, toggleModal, message}) => {
    const display = modal ? 'block' : 'none';
    if (modal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    };
    return (
        <div className="overlay" style={{display:`${display}`}}>
            <div className="modal">
                {message}
                <button
                    className="modal__btn"
                    onClick={() => toggleModal('')}>
                        Ok
                </button>
            </div>
        </div>
    )
};

const mapStateToProps = ({modal, message}) => {
    return { modal, message }
};

const mapDispatchToProps = ({toggleModal});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);