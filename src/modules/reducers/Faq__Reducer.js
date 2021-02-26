const initialState = {
    dataFaqFooter: {},
    dataFaqList: [], 
    loadingFaqFooter: true,
    loadingFaqList: true
}

export const FaqData = (state = initialState, action) => {
    switch(action.type){
        case "FAQ_FOOTER":
            return {
                ...state,
                loadingFaqFooter: false,
                dataFaqFooter: {...action.load}
            }
        case "LOADING_FAQ_FOOTER": 
            return {
                ...state,
                loadingFaqFooter: !state.loadingFaqFooter
            }
        case "FAQ_LIST_DATA":
            return {
                ...state,
                loadingFaqList: false,
                dataFaqList: [...action.load]
            }
        case "LOADING_FAQ_LIST": 
            return {
                ...state,
                loadingFaqList: !state.loadingFaqList
            }
        default:
            return state
    }
}   