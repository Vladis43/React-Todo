import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import rootReducer from 'reducers'

const store = createStore(rootReducer, compose(applyMiddleware(logger),
    window.devToolsExtension && window.devToolsExtension()))

export default store