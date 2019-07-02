import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from '../hoc/';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';
import {withRouter} from 'react-router-dom';



import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
        const {RestoService, menuLoaded, menuRequested, menuError} = this.props;

        menuRequested();

        RestoService.getMenuItems()
            .then(res => menuLoaded(res))
            .catch(err => menuError(err));
    }

    categories = [];
    categoryImgs = [];
    categoryImg = '';

    getCategoryImg = (menuItem = {}) => {
        const {category, url} = menuItem;
        const index = this.categories.indexOf(category);

        if (index === -1) {
            this.categories.push(category);
            this.categoryImg = url;
            this.categoryImgs.push(this.categoryImg);
        } else {
            this.categoryImg = this.categoryImgs[index];
        }
        return this.categoryImg;
    }

    menuList = () => {
        const {menuItems, addedToCart} = this.props;
        return (
            <ul className="menu__list">
                {
                    menuItems.map(menuItem => {
                        return  <MenuListItem 
                                    onAddToCart={() => addedToCart(menuItem.id)}
                                    key={menuItem.id}  
                                    categoryImg={this.getCategoryImg(menuItem)} 
                                    menuItem={menuItem}
                                    onItemSelected={(itemId) => {
                                        this.props.history.push(`/${itemId}`)
                                    }}/>
                    })
                }
            </ul>
        )
    }

    render() {
        const {loading, errorMessage} = this.props;

        return  <View
                    success={this.menuList}
                    loading={loading}
                    error={errorMessage} />
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
    menuError,
    addedToCart
};

export default withRouter(WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList)));



const View = ({success, loading, error}) => {

        if (loading) {
            return <Spinner />
        }
        
        if (error) {
            return <Error errorMessage={error} />
        }

        return success()
}