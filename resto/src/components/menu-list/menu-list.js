import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc/';
import {menuLoaded, menuRequested, menuError} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';


import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
        const {RestoService, menuLoaded, menuRequested, menuError} = this.props;

        menuRequested();

        RestoService.getMenuItems()
            .then(res => menuLoaded(res))
            .catch(err => menuError(err));
    }

    render() {
        const {menuItems, loading, errorMessage} = this.props;

        if (loading) {
            return <Spinner />
        }
        
        if (errorMessage) {
            return <Error errorMessage={errorMessage} />
        }

        let categories = [],
            categoryImgs = [];

        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {

                        // будем ставить иконку на карточке по картинке первого встречного блюда из этой категории
                        const {id, category, url} = menuItem;
                        let categoryImg = '';
                        const index = categories.indexOf(category);

                        if (index === -1) {
                            categories.push(category);
                            categoryImg = url;
                            categoryImgs.push(categoryImg);
                        } else {
                            categoryImg = categoryImgs[index];
                        }

                        return <MenuListItem key={id} categoryImg={categoryImg} menuItem={menuItem}/>
                    })
                }
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    const {menu, loading, errorMessage} = state;

    return {
        menuItems: menu,
        loading,
        errorMessage
    }
};

// connect все делает сам
const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));