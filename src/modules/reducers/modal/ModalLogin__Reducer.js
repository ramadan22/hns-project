const initialState = {
    data: false,
}

export const ModalLogin = (state = initialState, action) => {
    switch(action.type){
        case "MODAL_LOGIN":
            return {
                ...state,
                data: action.load
            }
        default:
            return state
    }
}   