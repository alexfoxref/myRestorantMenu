export const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
}

export const menuRequested = (bool) => {
    return {
        type: 'MENU_REQUESTED',
        payload: bool
    }
}

export const menuError = (err) => {
    const num = `${err}`.replace(/[^(\d\d\d)]/g, '');
    return {
        type: 'MENU_ERROR',
        errorMessage: num
    }
}

export const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    }
}

export const deleteFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    }
}

export const minusCount = (id) => {
    return {
        type: 'MINUS_NUMBER',
        payload: id
    }
}

export const plusCount = (id) => {
    return {
        type: 'PLUS_NUMBER',
        payload: id
    }
}

export const sendOrder = () => {
    return {
        type: 'SEND_ORDER'
    }
}

export const toggleModal = (message) => {
    return {
        type: 'TOGGLE_MODAL',
        message
    }
}

export const postData = (url, data) => {
    const _apiBase = 'http://localhost:3000';

    return (dispatch) => {
        dispatch(menuRequested(true));

        fetch(`${_apiBase}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Could not fetch ${url}, received ${res.status}`)
                }
                dispatch(menuRequested(false));
                dispatch(sendOrder());
                dispatch(toggleModal('Your order was successfully sent!'));
            })
            .catch(err => dispatch(menuError(err)));
    }
}