const initialState = {
    loading: true,
    data: null,
    listRfp: []
  }
  
  export const GtsDataGetReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_DATA' :
        return {
          ...state,
          data: action.load
        }
    //   case 'INIT_FETCH' :
    //     return {
    //       ...state,
    //       loading: !state.loading
    //     }
    //   case 'FETCH_RFP' :
    //     return {
    //       ...state,
    //       listRfp: [...action.data],
    //       loading: false
    //     }
    //   case 'CHANGE_PACKAGE_ATTENDEES' :
    //     console.log('reducer', action.packageAttendees)
    //     return {
    //       ...state,
    //       listRfp: [...action.packageAttendees],
    //       loading: false
    //     }
    //   case 'CHANGE_FOOD_QUALITY' :
    //     return {
    //       ...state,
    //       listRfp: [...action.data],
    //       loading: false
    //     }
    //   case 'CHANGE_ACCOMODATION_QUALITY' :
    //     return {
    //       ...state,
    //       listRfp: [...action.data],
    //       loading: false
    //     }
      default:
        return state
    }
  }