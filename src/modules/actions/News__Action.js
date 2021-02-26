import { Api } from '../../helpers/api'

export const NewsLatestAction = () => {
    return dispatch => {
        dispatch(request())
        Api.get('/master/api/v1/news/latest')
        .then(async (response) => {
            await dispatch(NewsLatestData(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

export const NewsLatestActionDetailParam = (value) => {
    return dispatch => {
        dispatch(NewsDetailParam(value))
    }
}

const request = () => ({
    type: 'LOADING'
})

const NewsLatestData = (data) => ({
    type: "NEWS_LATEST",
    load: data 
})

const NewsDetailParam = (data) => ({
    type: "NEWS_DETAIL_PARAM",
    load: data 
})