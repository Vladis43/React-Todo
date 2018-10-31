const initialState = {
    todo: 'first todo'
}

const rootReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_TODO':
            return {
                ...state, todo: action.payload
            }
            break
        default: return state
    }
}

export default rootReducers