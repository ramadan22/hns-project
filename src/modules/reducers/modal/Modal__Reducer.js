const initialState = {
    data: null,
}

export const ModalReducer = (state = initialState, action) => {
    switch(action.type){
        case "MODAL_DATA":
            return {
                ...state,
                data: action.load
            }
        default:
            return state
    }
}   