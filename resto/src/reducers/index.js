const initialState = {
    menu: [],
    loading: true,
    errorMessage: null
}

const reducer = (state = initialState, action) => {
    const {type, payload, errorMessage} = action;
    const {menu} = state;

    switch (type) {
        case 'MENU_LOADED':
            return {
                menu: payload,
                loading: false,
                errorMessage: null
            };
        case 'MENU_REQUESTED':
            return {
                menu,
                loading: true,
                errorMessage: null
            };
        case 'MENU_ERROR':
            return {
                menu,
                loading: false,
                errorMessage
            };
        default:
            return state;
    }
}

export default reducer;