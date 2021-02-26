import { Api } from '../../helpers/api'

export const EventListAction = () => {
    return dispatch => {
        dispatch(request())
        Api.get('/supplier/api/v1/events/fetch')
        .then(async (response) => {
            await dispatch(EventList(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

const request = () => ({
    type: 'LOADING'
})

const EventList = (data) => ({
    type: "EVENT_LIST",
    load: data 
})