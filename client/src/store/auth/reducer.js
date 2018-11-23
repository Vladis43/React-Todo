import { success, error } from 'redux-saga-requests'

const initialState = {
    isError: false,
    users: [],
    errorMessage: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_UP':
            return {
                ...state,
                isError: false
            }

        case success('SIGN_UP'):
            return {
                ...state,
                isError: false,
                users: {...action.payload.data, ...action.payload.data.payload}
            }

        case error('SIGN_UP'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.response.data.errors[0].msg
            }

        case 'SIGN_IN':
            return {
                ...state,
                isError: false
            }

        case success('SIGN_IN'):
            return {
                ...state,
                isError: false,
                users: {...action.payload.data, ...action.payload.data.payload}
            }

        case error('SIGN_IN'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.message
            }

        default:
            return state
    }
}

export default authReducer