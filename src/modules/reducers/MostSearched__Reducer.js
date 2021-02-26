const initialState = {
    data: null,
    loadingMostSearched: true
}

export const MostSearchedData = (state = initialState, action) => {
    switch(action.type){
        case "MOST_SEARCHED_LIST" : 
            return {
                ...state,
                loadingMostSearched: false,
                data: action.load
            }
        case "LOADING":
            return {
                ...state,
                loadingMostSearched: !state.loadingMostSearched
            }
        default: 
            return state
    }
}