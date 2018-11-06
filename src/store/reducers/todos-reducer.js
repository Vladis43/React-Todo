const initialState = {
    todos: []
}

const todosReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODO':
        case 'LOCAL_STORAGE':
        case 'ADD_NEW_TODO':
            return {
                ...state, todos: action.payload
            }

        case 'TOGGLE_TODO':
            const toggleTodo = state.todos.map((todoItem) =>
                action.payload === todoItem.id ? {...todoItem, completed: !todoItem.completed} : todoItem
            )
            return {
                ...state, todos: toggleTodo
            }

        case 'DELETE_TODO':
            const deleteTodo = state.todos.filter((todo) =>
                todo.id !== action.payload
            )
            return {
                ...state, todos: deleteTodo
            }

        case 'CLEAR_ALL':
            return {
                ...state, todos: []
            }

        default: return state
    }
}

export default todosReducers