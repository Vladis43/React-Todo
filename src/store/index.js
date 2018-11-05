import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from 'reducers'

const store = createStore(rootReducer, compose(applyMiddleware(thunk, logger),
    window.devToolsExtension && window.devToolsExtension()))

export default store