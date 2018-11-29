import {success, error} from 'redux-saga-requests'

const initialState = {
    isError: false,
    isFetching: false,
    errorMessage: null,
    items: []
}

const todosReducers = (state = initialState, action) => {
    switch (action.type) {
//GetTodo===============================================================================================================
        case 'FETCH_TODOS':
            return {...state, isFetching: true}

        case success('FETCH_TODOS'):
            return {
                ...state,
                isFetching: false,
                isError: false,
                items: action.payload.data
            }

        case error('FETCH_TODOS'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

//AddTodo===============================================================================================================
        case success('ADD_NEW_TODO'):
            return {
                ...state,
                isError: false,
                items: [...state.items, action.payload.data]
            }

        case error('ADD_NEW_TODO'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

//ToggleTodo============================================================================================================
        case success('TOGGLE_TODO'):
            const toggledTodo = state.items.map((todoItem) =>
                action.meta.id === todoItem._id ? {...todoItem, completed: !todoItem.completed} : todoItem
            )
            return {
                ...state,
                isError: false,
                items: toggledTodo
            }

        case error('TOGGLE_TODO'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

//DeleteTodo============================================================================================================
        case success('DELETE_TODO'):
            const deletedTodo = state.items.filter((todo) =>
                todo._id !== action.meta.id
            )
            return {
                ...state,
                isError: false,
                items: deletedTodo
            }

        case error('DELETE_TODO'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

//======================================================================================================================
        default:
            return state
    }
}

export default todosReducers