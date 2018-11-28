import { success, error } from 'redux-saga-requests'

const initialState = {
    isError: false,
    users: [],
    errorMessage: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_UP':
            return {
                ...state,
                isError: false,
                errorMessage: [],
                users: []
            }

        case success('SIGN_UP'):
            return {
                ...state,
                isError: false,
                errorMessage: [],
                users: {...action.payload.data, ...action.payload.data.payload}
            }

        case error('SIGN_UP'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.response.data.errors
            }

        case 'VERIFICATION':
            return {
                ...state,
                isError: false,
                errorMessage: [],
                users: []
            }

        case success('VERIFICATION'):
            return {
                ...state,
                isError: false,
                errorMessage: [],
                users: {...action.payload.data}
            }

        case error('VERIFICATION'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.response.data.errors,
                users: {...action.payload.response.data}
            }

        case 'SIGN_IN':
            return {
                ...state,
                isError: false,
                errorMessage: [],
                users: []
            }

        case success('SIGN_IN'):
            return {
                ...state,
                isError: false,
                errorMessage: [],
                users: {...action.payload.data, ...action.payload.data.payload}
            }

        case error('SIGN_IN'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.response.data.errors
            }

        default:
            return state
    }
}

export default authReducer