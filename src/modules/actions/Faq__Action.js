import { Api } from '../../helpers/api'

export const FaqFooterAction = () => {
    return dispatch => {
        dispatch(request())
        Api.get('/master/api/v1/faqFooter/fetch')
        .then(async (response) => {
            await dispatch(FaqFooterData(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

export const FaqListDataAction = () => {
    return dispatch => {
        dispatch(requestFaqList())
        Api.get('/master/api/v1/faq/fetch')
        .then((response) => {
            dispatch(FaqListData(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

const request = () => ({
    type: 'LOADING_FAQ_FOOTER'
})

const requestFaqList = () => ({
    type: 'LOADING_FAQ_LIST'
})

const FaqFooterData = (data) => ({
    type: "FAQ_FOOTER",
    load: data 
})

const FaqListData = (data) => ({
    type: "FAQ_LIST_DATA",
    load: data
})