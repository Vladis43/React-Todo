import { success, error } from 'redux-saga-requests'

const initialState = {
    isError: false,
    isFetching: false,
    errorMessage: null,
    items: []
}

const todosReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODO':
            return {...state, isFetching: true}

        case success('GET_TODO'):
            return {
                ...state,
                isFetching: false,
                isError: false,
                items: action.payload.data
            }

        case error('GET_TODO'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

        case 'ADD_NEW_TODO':
            return {...state, isFetching: true}

        case success('ADD_NEW_TODO'):
            return {
                ...state,
                isFetching: false,
                isError: false,
                items: [...state.items, action.payload.data]
            }

        case error('ADD_NEW_TODO'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

        case 'TOGGLE_TODO':
            return {...state, isFetching: true}

        case success('TOGGLE_TODO'):
            const toggledTodo = state.items.map((todoItem) =>
                action.payload.data === todoItem.id ? {...todoItem, completed: !todoItem.completed} : todoItem
            )
            return {
                ...state,
                isFetching: false,
                isError: false,
                items: toggledTodo
            }

        case error('TOGGLE_TODO'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

        case 'DELETE_TODO':
            return {...state, isFetching: true}

        case success('DELETE_TODO'):
            const deletedTodo = state.items.filter((todo) =>
                todo.id !== action.meta.id
            )
            return {
                ...state,
                isFetching: false,
                isError: false,
                items: deletedTodo
            }

        case error('DELETE_TODO'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

        case 'CLEAR_ALL':
            return {
                ...state, items: []
            }

        default: return state
    }
}

export default todosReducers