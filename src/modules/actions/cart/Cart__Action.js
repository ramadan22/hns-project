import { Api } from '../../../helpers/api'
import { getData, storageData } from '../../../utils/localStorage'

export const CartActionAdd = (param) => {
  return dispatch => {
    const tokenLogin = getData('tokenLogin')
    if(param !== null && tokenLogin){
      Api.put(`/supplier/api/v2/cart/update`, param, {headers: { 'User-Token': `${tokenLogin}` }})
      .then(res => {
        dispatch(CartList(res.data.data.detail))
        if(param.modalStatus !== 'no-modal'){
          // dispatch(MessageProcess(res.data))
          dispatch(MessageProcessEmpty({nonModal: true}))
        } else {
          dispatch(MessageProcessEmpty())
        }
      })
      .catch(function (error) {
        console.log(error.response)
      })
    } else if(param !== null) {
      // console.log({...param, guestId: (getData("guestIdRfp") ? getData("guestIdRfp") : "" )})
      Api.put(`/supplier/api/v2/cart/update`, {...param, guestId: (getData("guestIdRfp") ? getData("guestIdRfp") : "" )})
      .then(res => {
        dispatch(CartList(res.data.data.detail))
        if(param.modalStatus !== 'no-modal'){
          if(!getData("guestIdRfp")){
            storageData("guestIdRfp", res.data.data.guestId)
          }
          // dispatch(MessageProcess(res.data))
          dispatch(CartDataAdd(res.data.data))
          dispatch(MessageProcessEmpty({nonModal: true}))
        } else {
          dispatch(MessageProcessEmpty())
        }
      })
      .catch(function (error) {
        console.log(error.response)
      })
    } else {
      dispatch(MessageProcessEmpty())
    }
  }
} 

export const CartActionGet = () =>{
  return dispatch => {
    const tokenLogin = getData('tokenLogin')
    // if(tokenLogin){
      Api.get(`/supplier/api/v2/cart/fetch${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : ""}`, {headers: { 'User-Token': `${tokenLogin}` }})
      .then(res => {
        dispatch(CartList(res.data.data.detail))
      })
      .catch(function (error) {
        dispatch(CartList([]))
      })
    // } else {
    //   Api.get(`/supplier/api/v2/cart/fetch${getData("guestIdRfp") ? "?guestId="+getData("guestIdRfp") : ""}`)
    //   .then(res => {
    //     dispatch(CartList(res.data.data.detail))
    //   })
    //   .catch(function (error) {
    //     dispatch(CartList([]))
    //   })
    // }
  }
}

const CartList = (data) => ({
  type: "CART_LIST",
  load: data 
})

const CartDataAdd = (data) => ({
  type: "CART_ADD",
  load: data 
})

const MessageProcess = (data) => ({
  type: "MESSAGE_PROCESS",
  load: data 
})

const MessageProcessEmpty = () => ({
  type: "MESSAGE_PROCESS_EMPTY"
})