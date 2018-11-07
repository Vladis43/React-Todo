import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middleware = applyMiddleware(thunk, logger)
const reduxDevTools = window.devToolsExtension && window.devToolsExtension()

const store = createStore(rootReducer, compose(middleware, reduxDevTools))

export default store