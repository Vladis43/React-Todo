import { createStore, applyMiddleware, compose } from 'redux'
import logger from './logger'
import { combineReducers } from 'redux'
import todosReducer from './todos/reducer'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga'

const rootReducer = combineReducers({
    todos: todosReducer
})

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, logger)
const reduxDevTools = window.devToolsExtension && window.devToolsExtension()

const store = createStore(rootReducer, compose(middleware, reduxDevTools))

sagaMiddleware.run(rootSaga)

export default store