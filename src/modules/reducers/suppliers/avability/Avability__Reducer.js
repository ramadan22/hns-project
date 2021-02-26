const initialState = {
    dataAvabilityList: null,
    loadingAvability: true,
    dataAvabilityDetail: null,
    loadingAvabilityDetail: true,
}

export const AvabilityResult = (state = initialState, action) => {
    switch (action.type) {
        case "AVABILITY_SUBMIT":
            return {
                ...state,
                loadingAvability: false,
                dataAvabilityList: action.load
            }
        case "LOADING":
            return {
                ...state,
                loadingAvability: !state.loadingAvability
            }
        default:
            return state
    }
}

export const AvabilityDetail = (state = initialState, action) => {
    switch (action.type) {
        case "AVABILITY_DETAIL_SUBMIT":
            return {
                ...state,
                loadingAvabilityDetail: false,
                dataAvabilityDetail: action.load
            }
        case "LOADING_AVABILITY_DETAIL":
            return {
                ...state,
                loadingAvabilityDetail: !state.loadingAvabilityDetail
            }
        default:
            return state
    }
}