import {URL} from 'config'

export const FETCH_CARDS = 'FETCH_CARDS'
export const fetchCards = (userId, token) => ({
    type: FETCH_CARDS,
    payload: {
        request: {
            url: `${URL}cards/${userId}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }
})

export const ADD_NEW_CARD = 'ADD_NEW_CARD'
export const addNewCard = (card, token) => ({
    type: ADD_NEW_CARD,
    payload: {
        request: {
            url: `${URL}cards`,
            method: 'POST',
            data: card,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }
})

export const EDIT_CARD = 'EDIT_CARD'
export const editCard = (id, card, token) => ({
    type: EDIT_CARD,
    payload: {
        request: {
            url: `${URL}cards/${id}`,
            method: 'PUT',
            data: card,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    },
    meta: {
        id
    }
})

export const DELETE_CARD = 'DELETE_CARD'
export const deleteCard = (id, token) => ({
    type: DELETE_CARD,
    payload: {
        request: {
            url: `${URL}cards/${id}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    },
    meta: {
        id
    }
})