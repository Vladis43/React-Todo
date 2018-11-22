import { createStore, applyMiddleware, compose } from 'redux'
import logger from './middleware/logger'
import { combineReducers } from 'redux'
import todosReducer from './todos/reducer'
import authReducer from './auth/reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const rootReducer = combineReducers({
    todos: todosReducer,
    auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(sagaMiddleware, logger)
const reduxDevTools = window.devToolsExtension && window.devToolsExtension()

const store = createStore(rootReducer, compose(middleware, reduxDevTools))

sagaMiddleware.run(rootSaga)

export default store