//action types

export const ADD_TODO = 'ADD_TODO'

//action creators

export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        text
    }
}

