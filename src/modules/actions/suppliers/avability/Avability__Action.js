import { Api } from '../../../../helpers/api'

export const AvabilityAction = (params) => {
    return dispatch => {
        dispatch(request())
        var cityValue = ""
        if(params.cityFilter && params.cityFilter !== '' && params.cityFilter.length > 0){
            console.log("params.cityFilter", params)
            params.cityFilter.map(res => {
                cityValue = "&city="+params.cityFilter[0].city
                // cityValue += "&city[]="+res.city+""
            })
        }

        Api.get(`/supplier/api/v1/availibility?page=${params.page}&perPage=${params.perPage}${params.cityFilter !== '' ? cityValue : ''}${params.eventsId !== '' ? '&eventsId[]='+params.eventsId : ''}${params.cityName !== '' ? '&city='+params.cityName : ''}${params.minPriceMeetingRoom !== '' ? '&minPriceMeetingRoom='+params.minPriceMeetingRoom : ''}${params.maxPriceMeetingRoom !== '' ? '&maxPriceMeetingRoom='+params.maxPriceMeetingRoom : ''}${params.minPriceRoom !== '' ? '&minPriceRoom='+params.minPriceRoom : ''}${params.maxPriceRoom !== '' ? '&maxPriceRoom='+params.maxPriceRoom : ''}${params.minAttendees !== '' ? '&minAttendees='+params.minAttendees : ''}${params.maxAttendees !== '' ? '&maxAttendees='+params.maxAttendees : ''}${params.keyword !== undefined && params.keyword !== '' ? '&keyword='+params.keyword : ''}`)
        .then((response) => {
            console.log("response result", response)
            dispatch(AvabilitySubmit(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

export const AvabilityDetailAction = (params) => {
    return dispatch => {
        dispatch(request_loading_avability_detail())
        Api.get('/supplier/api/v1/availibility/detail?placeId='+params)
        .then((response) => {
            dispatch(AvabilityDetailSubmit(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

const request = () => ({
    type: "LOADING"
})

const AvabilitySubmit = (data) => ({
    type: "AVABILITY_SUBMIT",
    load: data
})

const request_loading_avability_detail = () => ({
    type: "LOADING_AVABILITY_DETAIL"
})

const AvabilityDetailSubmit = (data) => ({
    type: "AVABILITY_DETAIL_SUBMIT",
    load: data
})