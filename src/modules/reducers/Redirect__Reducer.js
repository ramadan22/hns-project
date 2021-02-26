const initialState = {
    data: null
}

export const RedirectTo = (state = initialState, action) => {
    switch(action.type){
        case "REDIRECT" : 
            return {
                ...state,
                data: action.load
            }
        default: 
            return state
    }
}