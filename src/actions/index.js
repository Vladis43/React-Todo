//Constants

//TodoApp
export const CHANGE_TODO_TEXT = 'CHANGE_TODO_TEXT'
export const ADD_NEW_TODO = 'ADD_NEW_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CLEAR_ALL = 'CLEAR_ALL'
export const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE'
export const GET_LOCAL_STORAGE = 'GET_LOCAL_STORAGE'

//Footer
export const SHOW_ALL = 'SHOW_ALL'
export const SHOW_CHECKED = 'SHOW_CHECKED'
export const SHOW_UNCHECKED = 'SHOW_UNCHECKED'


//Action creators

//TodoApp
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

export const clearAll = () => {
    return {
        type: CLEAR_ALL
    }
}

export const changeErrorMessage = (message) => {
    return {
        type: CHANGE_ERROR_MESSAGE,
        payload: message
    }
}

export const getLocalStorage = (data) => {
    return {
        type: GET_LOCAL_STORAGE,
        payload: data
    }
}

//Footer
export const showAll = (todo) => {
    return {
        type: SHOW_ALL,
        payload: todo
    }
}

export const showChecked = (todo) => {
    return {
        type: SHOW_CHECKED,
        payload: todo
    }
}

export const showUnchecked = (todo) => {
    return {
        type: SHOW_UNCHECKED,
        payload: todo
    }
}