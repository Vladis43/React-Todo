const initialState = {
    todoText: '',
    todos: [],
    errorMessage: ''
}

const rootReducers = (state = initialState, action) => {
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
                ...state, todos: action.payload
            }
        case 'DELETE_TODO':
            return {
                ...state, todos: action.payload
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

export default rootReducers