//action types

export const ADD_TODO = 'ADD_TODO'

//action creators

export const addTodo = (todo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

