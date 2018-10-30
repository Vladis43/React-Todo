//action types

export const ADD_TODO = 'ADD_TODO'
export const CHANGE_TODO = 'CHANGE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const CLEAR_TODO_LIST = 'CLEAR_TODO_LIST'

//action creators

export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const changeTodo = (todo) => {
    console.log(todo)
    return {
        type: CHANGE_TODO,
        payload: todo
    }
}

