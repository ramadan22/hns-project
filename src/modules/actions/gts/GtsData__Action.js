import { Api } from '../../../helpers/api'
import { getData, storageData } from '../../../utils/localStorage'

export const GtsDataGet = (guestId) => {
  return dispatch => {
    let tokenLogin = getData('tokenLogin') ? getData('tokenLogin') : ""
    Api.get(`/supplier/api/v2/gts/fetch?guestId=${guestId !== undefined ? guestId : ""}`, { headers: { 'User-Token': tokenLogin } })
      .then(res => {
        console.log("res", res)
        if(getData('guestId') === false || getData('guestId') === ""){
          storageData("guestId", res.data.data.guestId)
        }
        dispatch(GtsDataGetReducer(res.data.data))
      })
      .catch(function (error) {
        dispatch(GtsDataGetReducer(null))
      })
  }
}

// export const fetchRfp = () => {
//   return dispatch => {
//     dispatch({ type: 'INIT_FETCH' })
//     Api.get('/supplier/api/v1/rfp/fetch', {
//       headers: { 'User-Token': getData('tokenLogin') }
//     })
//       .then(response => {
//         const { data, message } = response.data
//         if (message === 'OK') {
//           return dispatch({
//             type: 'FETCH_RFP',
//             data: data.schedule
//           })
//         }
//       })
//       .catch(error => console.log(error.response.data.message))
//   }
// }

// export const actionPackageAttendees = (data) => {
//   return dispatch => dispatch({
//     type: 'CHANGE_PACKAGE_ATTENDEES',
//     data
//   })
// }

// export const actionFoodQuality = (data) => {
//   return dispatch => dispatch({
//     type: 'CHANGE_FOOD_QUALITY',
//     data
//   })
// }

// export const actionAccomondationQuality = (data) => {
//   return dispatch => dispatch({
//     type: 'CHANGE_FOOD_QUALITY',
//     data
//   })
// }

// export const actionCheckboxFood = (data) => {
//   return dispatch => dispatch({
//     type: 'CHECKBOX_FOOD',
//     data
//   })
// }

// export const actionCheckboxAccomodation = (data) => {
//   return dispatch => dispatch({
//     type: 'CHECKBOX_ACCOMODATION',
//     data
//   })
// }

const GtsDataGetReducer = (data) => ({
  type: "GET_DATA",
  load: data
})