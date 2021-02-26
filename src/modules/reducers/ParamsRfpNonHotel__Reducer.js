const initialState = {
    dataParamsRfpNonHotel: []
}

export const Params = (state = initialState, action) => {
    switch(action.type){
        case "PARAMS_RFP_NON_HOTEL" : 
            return {
                ...state,
                dataParamsRfpNonHotel: action.load
            }
        default: 
            return state
    }
}