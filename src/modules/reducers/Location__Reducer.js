const initialState = {
    dataLocationCity: null,
    dataLocationCountry: null,
    dataLocationDefault: null,
    loadingLocationCity: true
}

export const Location = (state = initialState, action) => {
    switch(action.type){
        case "LOCATION_CITY_LIST" : 
            return {
                ...state,
                loadingLocationCity: false,
                dataLocationCity: action.load
            }
        case "LOCATION_CITY_DEFAULT" : 
            return {
                ...state,
                dataLocationDefault: action.load
            }
        case "LOADING":
            return {
                ...state,
                loadingLocationCity: !state.loadingLocationCity
            }
        default: 
            return state
    }
}

export const LocationCountry = (state = initialState, action) => {
    switch(action.type){
        case "LOCATION_COUNTRY_LIST" : 
            return {
                ...state,
                dataLocationCountry: action.load
            }
        default: 
            return state
    }
}