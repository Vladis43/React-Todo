import {error, success} from "redux-saga-requests"

const initialState = {
    isError: false,
    isFetching: false,
    errorMessage: null,
    items: []
}

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
//GetCards===============================================================================================================
        case 'FETCH_CARDS':
            return {...state, isFetching: true}

        case success('FETCH_CARDS'):
            return {
                ...state,
                isError: false,
                items: action.payload.data
            }

        case error('FETCH_CARDS'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

//AddCard===============================================================================================================
        case success('ADD_NEW_CARD'):
            return {
                ...state,
                isError: false,
                items: [...state.items, action.payload.data]
            }

        case error('ADD_NEW_CARD'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

//DeleteCard============================================================================================================
        case success('DELETE_CARD'):
            const deletedTodo = state.items.filter((card) =>
                card._id !== action.meta.id
            )
            return {
                ...state,
                isError: false,
                items: deletedTodo
            }

        case error('DELETE_CARD'):
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

export default cardsReducer