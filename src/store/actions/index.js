import axios from 'axios'

const url = 'http://localhost:3001/todos/'

export const GET_TODO = 'GET_TODO'
export const getTodo = () => async (dispatch) => {
    try {
        const res = await axios.get(url)
        const todos = await res.data
        dispatch({
            type: GET_TODO,
            payload: todos
        })
        console.log(`'Response: ' ${res.status} ${res.statusText}`)
    } catch (err) {
        console.log('ERROR', err)
    }
}

export const ADD_NEW_TODO = 'ADD_NEW_TODO'
export const addNewTodo = (todo) => async (dispatch) => {
    try {
        const res = await axios.post(url, todo)
        dispatch({
            type: ADD_NEW_TODO,
            payload: todo
        })
        console.log(`'Response: ' ${res.status} ${res.statusText}`)
    } catch (err) {
        console.log('ERROR', err)
    }
}

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = (id, completed) => async (dispatch) => {
    try {
        const res = await axios.patch(url + id, {
            completed: !completed
        })
        dispatch({
            type: TOGGLE_TODO,
            payload: id
        })
        console.log(`'Response: ' ${res.status} ${res.statusText}`)
    } catch (err) {
        console.log('ERROR', err)
    }
}

export const DELETE_TODO = 'DELETE_TODO'
export const deleteTodo = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(url + id)
        dispatch({
            type: DELETE_TODO,
            payload: id
        })
        console.log(`'Response: ' ${res.status} ${res.statusText}`)
    } catch (err) {
        console.log('ERROR', err)
    }
}

export const CLEAR_ALL = 'CLEAR_ALL'
export const clearAll = () => {
    return {
        type: CLEAR_ALL
    }
}