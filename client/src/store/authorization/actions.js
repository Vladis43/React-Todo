import { URL } from 'config'

export const SIGN_UP = 'SIGN_UP'
export const signUp = (user) => ({
    type: SIGN_UP,
    payload: {
        request: {
            url: `${URL}users/register`,
            method: 'POST',
            data: user
        }
    }
})

export const SIGN_IN = 'SIGN_IN'
export const signIn = (user) => ({
    type: SIGN_UP,
    payload: {
        request: {
            url: `${URL}users/auth`,
            method: 'POST',
            data: user
        }
    }
})

