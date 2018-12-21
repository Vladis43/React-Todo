import {URL} from 'config'

export const FETCH_TODOS = 'FETCH_TODOS'
export const fetchTodos = (cardId, token) => ({
    type: FETCH_TODOS,
    payload: {
        request: {
            url: `${URL}todos/${cardId}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }
})

export const ADD_NEW_TODO = 'ADD_NEW_TODO'
export const addNewTodo = (cardId, todo, token) => ({
    type: ADD_NEW_TODO,
    payload: {
        request: {
            url: `${URL}todos/${cardId}`,
            method: 'POST',
            data: todo,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }
})

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = (id, token) => ({
    type: TOGGLE_TODO,
    payload: {
        request: {
            url: `${URL}todos/${id}`,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    },
    meta: {
        id
    }
})

export const DELETE_TODO = 'DELETE_TODO'
export const deleteTodo = (id, token) => ({
    type: DELETE_TODO,
    payload: {
        request: {
            url: `${URL}todos/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    },
    meta: {
        id
    }
})