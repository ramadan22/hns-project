const initialState = {
    data: null,
    loadingEvent: true
}

export const EventList = (state = initialState, action) => {
    switch(action.type){
        case "EVENT_LIST":
            return {
                ...state,
                loadingEvent: false,
                data: action.load
            }
        case "LOADING": 
            return {
                ...state,
                loadingEvent: !state.loadingEvent
            }
        default:
            return state
    }
}   