const initialState = {
    todoText: '',
    todos: [],
    errorMessage: ''
}

const todosReducers = (state = initialState, action) => {
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
            const toggleTodo = state.todos.map((todoItem) =>
                action.payload === todoItem.id ? {...todoItem, complete: !todoItem.complete} : todoItem
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
            if (state.errorMessage !== '') {
                state.errorMessage = ''
            }
            return {
                ...state, todos: []
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