import { createStore, applyMiddleware, compose } from 'redux'
// import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'
import rootSaga from './saga'


const logger = store => next => action => {
    console.log('store', store.getState())
    console.log('action', action)
    next(action)
    console.log('next store', store.getState())
}


const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, logger)
const reduxDevTools = window.devToolsExtension && window.devToolsExtension()

const store = createStore(rootReducer, compose(middleware, reduxDevTools))

sagaMiddleware.run(rootSaga)

export default store