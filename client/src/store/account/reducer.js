import {success, error} from 'redux-saga-requests'
import jwt_decode from 'jwt-decode'

const initialState = {
    isError: false,
    users: [],
    errorMessage: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
//SignUp================================================================================================================
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
                users: {...action.payload.data}
            }

        case error('SIGN_UP'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.response.data.errors
            }

//Verification==========================================================================================================
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
                users: {...action.payload.data, ...action.payload.data.payload}
            }

        case error('VERIFICATION'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.response.data.errors
            }

//SignIn================================================================================================================
        case 'SIGN_IN':
            return {
                ...state,
                isError: false,
                errorMessage: [],
                users: []
            }

        case success('SIGN_IN'):
            const payload = {payload: jwt_decode(action.payload.data.token)._doc}

            return {
                ...state,
                isError: false,
                errorMessage: [],
                users: {...action.payload.data, ...payload}
            }

        case error('SIGN_IN'):
            return {
                ...state,
                isError: true,
                errorMessage: action.payload.response.data.errors
            }

//======================================================================================================================
        default:
            return state
    }
}

export default authReducer