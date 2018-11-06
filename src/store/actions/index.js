export const ADD_NEW_TODO = 'ADD_NEW_TODO'
export const addNewTodo = (todo) => {
    return {
        type: ADD_NEW_TODO,
        payload: todo
    }
}

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = (todo) => {
    return {
        type: TOGGLE_TODO,
        payload: todo
    }
}

export const DELETE_TODO = 'DELETE_TODO'
export const deleteTodo = (todo) => {
    return {
        type: DELETE_TODO,
        payload: todo
    }
}

export const CLEAR_ALL = 'CLEAR_ALL'
export const clearAll = () => {
    return {
        type: CLEAR_ALL
    }
}

export const LOCAL_STORAGE = 'LOCAL_STORAGE'
export const getDataFromLocalStorage = (data) => {
    return {
        type: LOCAL_STORAGE,
        payload: data
    }
}