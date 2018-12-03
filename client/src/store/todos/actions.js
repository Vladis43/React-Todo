import {URL} from 'config/config'

export const FETCH_TODOS = 'FETCH_TODOS'
export const fetchTodos = (cardId) => ({
    type: FETCH_TODOS,
    payload: {
        request: {
            url: `${URL}todos/${cardId}`,
            method: 'GET'
        }
    }
})

export const ADD_NEW_TODO = 'ADD_NEW_TODO'
export const addNewTodo = (todo) => ({
    type: ADD_NEW_TODO,
    payload: {
        request: {
            url: `${URL}todos`,
            method: 'POST',
            data: todo
        }
    }
})

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = (id, completed) => ({
    type: TOGGLE_TODO,
    payload: {
        request: {
            url: `${URL}todos/${id}`,
            method: 'PATCH',
            data: {completed: !completed}
        }
    },
    meta: {
        id
    }
})

export const DELETE_TODO = 'DELETE_TODO'
export const deleteTodo = (id) => ({
    type: DELETE_TODO,
    payload: {
        request: {
            url: `${URL}todos/${id}`,
            method: 'DELETE'
        }
    },
    meta: {
        id
    }
})