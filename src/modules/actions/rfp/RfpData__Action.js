import { Api } from '../../../helpers/api'
import { getData } from '../../../utils/localStorage'

export const RfpDataGet = () => {
  return dispatch => {
    // dispatch({ type: 'INIT FETCH' })
    Api.get(`/supplier/api/v2/rfp/fetch${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : ""}`, { headers: { 'User-Token': getData('tokenLogin') } })
      .then(res => {
        dispatch(RfpDataGetReducer(res.data.data))
      })
      .catch(function (error) {
        dispatch(RfpDataGetReducer(null))
      })
  }
}

export const fetchRfp = () => {
  return dispatch => {
    dispatch({ type: 'INIT_FETCH' })
    Api.get(`/supplier/api/v2/rfp/fetch${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : ""}`, {
      headers: { 'User-Token': getData('tokenLogin') }
    })
      .then(response => {
        const { data, message } = response.data
        if (message === 'OK') {
          return dispatch({
            type: 'FETCH_RFP',
            data: data.schedule
          })
        }
      })
      .catch(error => console.log(error.response.data.message))
  }
}

export const actionPackageAttendees = (data) => {
  return dispatch => dispatch({
    type: 'CHANGE_PACKAGE_ATTENDEES',
    data
  })
}

export const actionFoodQuality = (data) => {
  return dispatch => dispatch({
    type: 'CHANGE_FOOD_QUALITY',
    data
  })
}

export const actionAccomondationQuality = (data) => {
  return dispatch => dispatch({
    type: 'CHANGE_FOOD_QUALITY',
    data
  })
}

export const actionCheckboxFood = (data) => {
  return dispatch => dispatch({
    type: 'CHECKBOX_FOOD',
    data
  })
}

export const actionCheckboxAccomodation = (data) => {
  return dispatch => dispatch({
    type: 'CHECKBOX_ACCOMODATION',
    data
  })
}

const RfpDataGetReducer = (data) => ({
  type: "GET_DATA",
  load: data
})