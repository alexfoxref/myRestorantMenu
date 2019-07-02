const initialState = {
    menu: [],
    loading: true,
    errorMessage: null,
    items: [],
    total: 0,
    modal: false,
    message: ''
};

const reducer = (state = initialState, action) => {
    const {type, payload, errorMessage} = action;

    switch (type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: payload,
                loading: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                loading: payload,
            };
        case 'MENU_ERROR':
            return {
                ...state,
                loading: false,
                errorMessage
            };
        case 'ITEM_ADD_TO_CART':
            const id = payload;
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id
            };
            const countIndex = (state.items.findIndex(item => item.id === id));
            const newTotal = state.total + newItem.price;

            if (countIndex === -1) {
                newItem.number = 1;
                return {
                    ...state,
                    items: [
                        ...state.items,
                        newItem
                    ],
                    total: newTotal,

                }
            } else {
                newItem.number = state.items[countIndex].number + 1;
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, countIndex),
                        newItem,
                        ...state.items.slice(countIndex + 1)
                    ],
                    total: newTotal,

                }
            }
        case 'ITEM_REMOVE_FROM_CART':
            const idx = payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            const newTotalDel = state.total - (state.items[itemIndex].price * state.items[itemIndex].number);

            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                total: newTotalDel,

            }
        case 'MINUS_NUMBER':
            const idm = payload;
            const itemIndexMinus = state.items.findIndex(item => item.id === idm);
            const itemMinus = state.items.find(item => item.id === idm);
            const newItemMinus = {
                title: itemMinus.title,
                price: itemMinus.price,
                url: itemMinus.url,
                id: itemMinus.id,
                number: itemMinus.number - 1
            };
            const newTotalMinus = state.total - itemMinus.price;

            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndexMinus),
                    newItemMinus,
                    ...state.items.slice(itemIndexMinus + 1)
                ],
                total: newTotalMinus
            }
        case 'PLUS_NUMBER':
            const idp = payload;
            const itemIndexPlus = state.items.findIndex(item => item.id === idp);
            const itemPlus = state.items.find(item => item.id === idp);
            const newItemPlus = {
                title: itemPlus.title,
                price: itemPlus.price,
                url: itemPlus.url,
                id: itemPlus.id,
                number: itemPlus.number + 1
            };
            const newTotalPlus = state.total + itemPlus.price;

            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndexPlus),
                    newItemPlus,
                    ...state.items.slice(itemIndexPlus + 1)
                ],
                total: newTotalPlus
            }
        case 'SEND_ORDER':
            return {
                ...state,
                items: [],
                total: 0
            }
        case 'TOGGLE_MODAL':
            const message = action.message;
            return {
                ...state,
                modal: !state.modal,
                message
            }
        default:
            return state;
    }
}

export default reducer;