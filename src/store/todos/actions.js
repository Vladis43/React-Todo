import { URL } from 'config'
import uuidv4 from 'uuid'

export const FETCH_TODOS = 'FETCH_TODOS'
export const fetchTodos = () => ({
    type: FETCH_TODOS,
    payload: {
        request: {
            url: `${URL}todos`,
            method: 'GET'
        }
    }
})

export const ADD_NEW_TODO = 'ADD_NEW_TODO'
export const addNewTodo = (todoText) => ({
    type: ADD_NEW_TODO,
    payload: {
        request: {
            url: `${URL}todos`,
            method: 'POST',
            data: {
                id: uuidv4(),
                title: todoText,
                completed: false
            }
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

export const CLEAR_ALL = 'CLEAR_ALL'
export const clearAll = () => {
    return {
        type: CLEAR_ALL
    }
}