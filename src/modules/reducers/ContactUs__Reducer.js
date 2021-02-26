const initialState = {
    data: null
}

export const ContactUs = (state = initialState, action) => {
    switch(action.type){
        case "CONTACTUS_DATA" : 
            return {
                ...state,
                data: action.load
            }
        default: 
            return state
    }
}