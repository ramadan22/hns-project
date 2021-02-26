import { Api } from '../../helpers/api'

export const AttendeesListAction = () => {
    return dispatch => {
        dispatch(request())
        Api.get('/master/api/v1/attendees/fetch')
        .then(async (response) => {
            await dispatch(AttendeesList(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

const request = () => ({
    type: "LOADING"
})

const AttendeesList = (data) => ({
    type: "ATTENDEES_LIST",
    load: data
})