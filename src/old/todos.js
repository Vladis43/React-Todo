const initialState = {
    todoText: '',
    todos: []
}

export const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    todo: action.payload
                }
            ]
        case 'CHANGE_TODO':
            return [

                ...state,
                {
                    todo: action.payload.todo
                }
            ]
        default:
            return state
    }
}