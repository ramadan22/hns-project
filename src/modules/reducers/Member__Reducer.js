const initialState = {
    statusLogin: null,
    activePopup: null,
    LoginData: {}
}

export const LoginStatus = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN_STATUS":
            return {
                ...state,
                statusLogin: action.load
            }
        case "ACTIVE_POPUP":
            return {
                ...state,
                activePopup: action.load
            }
        case "CREATE_LOGIN_DATA":
            return {
                ...state,
                LoginData: {...action.load.data}
            }
        default:
            return state
    }
}   