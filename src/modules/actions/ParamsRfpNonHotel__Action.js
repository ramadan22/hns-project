export const RfpFormPost = (value) => {
    return dispatch => {
        dispatch(setParamsRfpNonHotel(value))
        // Api.get(`/master/api/v1/city/fetch?keyword=${value}`)
        // .then((response) => {
        //     // dispatch(LocationCityList(response.data.data))
        //     console.log()
        // })
        // .catch(function (error) {
        //     console.log(error)
        // })
    }
}

const setParamsRfpNonHotel = (data) => ({
    type: "PARAMS_RFP_NON_HOTEL",
    load: data
})