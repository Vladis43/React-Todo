import {URL} from 'config'

export const SIGN_UP = 'SIGN_UP'
export const signUp = (userData) => ({
    type: SIGN_UP,
    payload: {
        request: {
            url: `${URL}users/registration`,
            method: 'POST',
            data: userData
        }
    }
})

export const VERIFICATION = 'VERIFICATION'
export const verification = (vcode) => ({
    type: VERIFICATION,
    payload: {
        request: {
            url: `${URL}users/verification/${vcode}`,
            method: 'POST',
        }
    }
})

export const SIGN_IN = 'SIGN_IN'
export const signIn = (userData) => ({
    type: SIGN_IN,
    payload: {
        request: {
            url: `${URL}users/authorization`,
            method: 'POST',
            data: userData
        }
    }
})

