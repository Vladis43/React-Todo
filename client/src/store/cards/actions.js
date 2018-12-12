import {URL} from 'config'

export const FETCH_CARDS = 'FETCH_CARDS'
export const fetchCards = (userId) => ({
    type: FETCH_CARDS,
    payload: {
        request: {
            url: `${URL}cards/${userId}`,
            method: 'GET'
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

export const DELETE_CARD = 'DELETE_CARD'
export const deleteCard = (id) => ({
    type: DELETE_CARD,
    payload: {
        request: {
            url: `${URL}cards/${id}`,
            method: 'DELETE'
        }
    },
    meta: {
        id
    }
})