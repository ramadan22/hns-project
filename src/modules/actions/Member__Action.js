import { Api } from '../../helpers/api'

export const MemberLoginStatus = (value) => {
    return dispatch => {
        dispatch(LoginStatus(value))
    }
}

export const ActivePopup = (value) => {
    return dispatch => {
        dispatch(ActivePopupParam(value))
    }
}

export const CreateDataLogin = (value) => {
    return dispatch => {
        if(value !== ''){
            Api.get('/membership/api/v1/member/detail', {headers: { 'User-Token': value }})
            .then(res => {
                dispatch(CreateLoginData(res.data.data))
            })
            .catch(function (error) {
                // console.log(error.response)
            })
        } else {
            dispatch(CreateLoginData({}))
        }
    }
}

const LoginStatus = (data) => ({
    type: "LOGIN_STATUS",
    load: data 
})

const ActivePopupParam = (data) => ({
    type: "ACTIVE_POPUP",
    load: data 
})

const CreateLoginData = (data) => ({
    type: "CREATE_LOGIN_DATA",
    load: { data }
})