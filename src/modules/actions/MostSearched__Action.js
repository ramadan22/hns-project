import { Api } from '../../helpers/api'

export const MostSearchedAction = () => {
    return dispatch => {
        dispatch(request())
        Api.get('/master/api/v1/mostSearched/fetch')
        .then((response) => {
            dispatch(MostSearchedList(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

const request = () => ({
    type: "LOADING"
})

const MostSearchedList = (data) => ({
    type: "MOST_SEARCHED_LIST",
    load: data
})