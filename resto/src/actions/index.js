export const menuLoaded = (newMenu) => {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
}

export const menuRequested = () => {
    return {
        type: 'MENU_REQUESTED'
    }
}

export const menuError = (err) => {
    return {
        type: 'MENU_ERROR',
        errorMessage: err.message
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