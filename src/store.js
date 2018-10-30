import { createStore, applyMiddleware } from 'redux'
import AddTodoReducer from './reducers'

export const store = createStore(AddTodoReducer, {}, applyMiddleware())

