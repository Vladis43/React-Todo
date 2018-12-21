import {createStore, applyMiddleware} from 'redux'
import logger from './middleware/logger'
import {combineReducers} from 'redux'
import todosReducer from './todos/reducer'
import authReducer from './account/reducer'
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

const store = createStore(rootReducer, middleware)

sagaMiddleware.run(rootSaga)

export default store