import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const reduxDevTools = window.devToolsExtension && window.devToolsExtension()

const store = createStore(rootReducer, compose(applyMiddleware(thunk, logger), reduxDevTools))

export default store