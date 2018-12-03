import {createStore, applyMiddleware, compose} from 'redux'
import logger from './middleware/logger'
import {combineReducers} from 'redux'
import todosReducer from './todos/reducer'
import authReducer from './auth/reducer'
import cardsReducer from './cards/reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const rootReducer = combineReducers({
    todos: todosReducer,
    auth: authReducer,
    cards: cardsReducer
})

const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(sagaMiddleware, logger)
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(rootReducer, compose(middleware, reduxDevTools))

sagaMiddleware.run(rootSaga)

export default store