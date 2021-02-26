export const ModalAction = (value) => {
    return dispatch => {
        dispatch(ModalDataCreate(value))
    }
}

export const ModalActionLogin = (value) => {
    return dispatch => {
        dispatch(ModaLoginCreate(value))
    }
}

const ModalDataCreate = (data) => ({
    type: "MODAL_DATA",
    load: data 
})

const ModaLoginCreate = (data) => ({
    type: "MODAL_LOGIN",
    load: data 
})