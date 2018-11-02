const initialState = {
    todoText: '',
    todos: [],
    errorMessage: ''
}

const todosReducers = (state = initialState, action) => {

    const toggleTodo = state.todos.map((todoItem) => action.payload === todoItem.id ? {...todoItem, completed: !todoItem.completed} : todoItem)
    const deleteTodo = state.todos.filter((todo) => todo.id !== action.payload)

    switch (action.type) {
        case 'CHANGE_TODO_TEXT':
            return {
                ...state, todoText: action.payload
            }
        case 'ADD_NEW_TODO':
            return {
                ...state, todos: action.payload
            }
        case 'TOGGLE_TODO':
            return {
                ...state, todos: toggleTodo
            }
        case 'DELETE_TODO':
            return {
                ...state, todos: deleteTodo
            }
        case 'CLEAR_ALL':
            return {
                ...state, todos: action.payload
            }
        case 'CHANGE_ERROR_MESSAGE':
            return {
                ...state, errorMessage: action.payload
            }
        case 'GET_LOCAL_STORAGE':
            return{
                ...state, todos: action.payload
            }

        default: return state
    }
}

export default todosReducers