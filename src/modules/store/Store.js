import { createStore, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { rootReducers } from '../reducers'

export const Store = createStore(
    rootReducers,
    compose(
        applyMiddleware(reduxThunk)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)