const initialState = {
    data: []
}

const initialState2 = {
    data: {}
}

const initialState3 = {
    data: {}
}

export const CartDataList = (state = initialState, action) => {
    switch(action.type){
        case "CART_LIST" : 
            return {
                ...state,
                data: [...action.load]
            }
        default: 
            return state
    }
}

export const CartDataAdd = (state = initialState3, action) => {
    switch(action.type){
        case "CART_ADD" : 
            return {
                ...state,
                data: {...action.load}
            }
        default: 
            return state
    }
}

export const CartResponse = (state = initialState2, action) => {
    switch(action.type){
        case "MESSAGE_PROCESS" : 
            return {
                ...state,
                data: {...action.load}
            }
        case "MESSAGE_PROCESS_EMPTY" : 
            return {
                ...state,
                data: {}
            }
        default: 
            return state
    }
}