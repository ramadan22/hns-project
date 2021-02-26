import { Api } from '../../helpers/api'

export const ContactUsDataAction = () => {
    return dispatch => {
        Api.get('/master/api/v1/contactUs/fetch')
        .then(response => {
            dispatch(ContactUsData(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

const ContactUsData = (data) => ({
    type: "CONTACTUS_DATA",
    load: data
})