const initialState = {
    data: {},
    loadingNewsLatest: true
}

const initialState2 = {
    params: null
}

export const NewsLatestData = (state = initialState, action) => {
    switch(action.type){
        case "NEWS_LATEST":
            return {
                ...state,
                loadingNewsLatest: false,
                data: {...action.load}
            }
        case "LOADING": 
            return {
                ...state,
                loadingNewsLatest: !state.loadingNewsLatest
            }
        default:
            return state
    }
}   

export const NewsDetailParam = (state = initialState2, action) => {
    switch(action.type){
        case "NEWS_DETAIL_PARAM":
            return {
                ...state,
                params: {...action.load}
            }
        default:
            return state
    }
}   