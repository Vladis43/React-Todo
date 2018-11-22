import { URL } from 'config'

export const SIGN_UP = 'SIGN_UP'
export const signUp = (userData) => ({
    type: SIGN_UP,
    payload: {
        request: {
            url: `${URL}users/register`,
            method: 'POST',
            data: userData
        }
    }
})

export const SIGN_IN = 'SIGN_IN'
export const signIn = (userData) => ({
    type: SIGN_UP,
    payload: {
        request: {
            url: `${URL}users/auth`,
            method: 'POST',
            data: userData
        }
    }
})
