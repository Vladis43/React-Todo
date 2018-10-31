export const CHANGE_TODO = 'CHANGE_TODO'

export const changeTodo = (newTodo) => {
    console.log(newTodo)
    return {
        type: CHANGE_TODO,
        payload: newTodo
    }
}

