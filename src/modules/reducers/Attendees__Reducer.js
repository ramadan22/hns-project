const initialState = {
    data: null,
    loadingAttendees: true
}

export const AttendeesList = (state = initialState, action) => {
    switch(action.type){
        case "ATTENDEES_LIST" : 
            return {
                ...state,
                loadingAttendees: false,
                data: action.load
            }
        case "LOADING":
            return {
                ...state,
                loadingAttendees: !state.loadingAttendees
            }
        default: 
            return state
    }
}