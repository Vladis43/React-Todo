export const CHANGE_TODO_TEXT = 'CHANGE_TODO_TEXT'
export const ADD_NEW_TODO = 'ADD_NEW_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE'

export const changeTodoText = (todo) => {
    return {
        type: CHANGE_TODO_TEXT,
        payload: todo
    }
}

export const addNewTodo = (todo) => {
    return {
        type: ADD_NEW_TODO,
        payload: todo
    }
}

export const toggleTodo = (todo) => {
    return {
        type: TOGGLE_TODO,
        payload: todo
    }
}

export const deleteTodo = (todo) => {
    return {
        type: DELETE_TODO,
        payload: todo
    }
}

export const changeErrorMessage = (message) => {
    return {
        type: CHANGE_ERROR_MESSAGE,
        payload: message
    }
}