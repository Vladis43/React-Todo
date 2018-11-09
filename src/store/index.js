import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, logger)
const reduxDevTools = window.devToolsExtension && window.devToolsExtension()

const store = createStore(rootReducer, compose(middleware, reduxDevTools))

sagaMiddleware.run(rootSaga)

export default store