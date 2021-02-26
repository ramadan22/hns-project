export const RedirectAction = (value) => {
    return dispatch => {
        dispatch(redirectTo(value))
    }
}

const redirectTo = (data) => ({
    type: "REDIRECT",
    load: data 
})