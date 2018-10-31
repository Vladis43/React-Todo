export const CHANGE_TODO_TEXT = 'CHANGE_TODO_TEXT'
export const ADD_NEW_TODO = 'ADD_NEW_TODO'
export const CHANGE_ERROR_MESSAGE = 'CHANGE_ERROR_MESSAGE'

export const changeTodoText = (newTodo) => {
    return {
        type: CHANGE_TODO_TEXT,
        payload: newTodo
    }
}

export const addNewTodo = (newTodo) => {
    return {
        type: ADD_NEW_TODO,
        payload: newTodo
    }
}

export const changeErrorMessage = (newMessage) => {
    return {
        type: CHANGE_ERROR_MESSAGE,
        payload: newMessage
    }
}

