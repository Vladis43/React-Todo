export const CHANGE_TODO_TEXT = 'CHANGE_TODO_TEXT'
export const ADD_NEW_TODO = 'ADD_NEW_TODO'

export const changeTodoText = (newTodo) => {
    return {
        type: CHANGE_TODO_TEXT,
        payload: newTodo
    }
}

export const addNewTodo = (newTodo) => {
    console.log('Btn clicked!', newTodo)
    return {
        type: ADD_NEW_TODO,
        payload: newTodo
    }
}

