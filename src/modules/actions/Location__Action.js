import { Api } from '../../helpers/api'

export const LocationCityAction = (value, countryCode) => {
    return dispatch => {
        if(value !== null){
            dispatch(request())
            Api.get(`/master/api/v1/city/fetch?keyword=${value}${countryCode && countryCode !== undefined && countryCode !== "" ? "&countryCode="+countryCode : ""}`)
            .then((response) => {
                dispatch(LocationCityList(response.data.data))
            })
            .catch(function (error) {
                console.log(error)
            })
        } else {
            dispatch(LocationCityList(null))
        }
    }
}

export const LocationCountryAction = (value) => {
    return dispatch => {
        dispatch(request())
        Api.get(`/master/api/v1/country/fetch?keyword=${value}`)
        .then((response) => {
            dispatch(LocationCountryList(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

export const LocationCityActionDeafult = () => {
    return dispatch => {
        dispatch(request())
        Api.get(`/master/api/v1/city/fetch?cityId[]=e1301b88-bf49-11ea-af04-d2ae79d0181e`)
        .then((response) => {
            dispatch(LocationCityDeafult(response.data.data))
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}

const request = () => ({
    type: "LOADING"
})

const LocationCityList = (data) => ({
    type: "LOCATION_CITY_LIST",
    load: data
})

const LocationCountryList = (data) => ({
    type: "LOCATION_COUNTRY_LIST",
    load: data
})

const LocationCityDeafult = (data) => ({
    type: "LOCATION_CITY_DEFAULT",
    load: data
})