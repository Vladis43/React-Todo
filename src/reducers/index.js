const initialState = {
    todoText: '',
    todos: [
        {text: 'todo1', completed: false},
        {text: 'todo2', completed: false}
    ]
}

const rootReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_TODO_TEXT':
            return {
                ...state, todoText: action.payload
            }
        case 'ADD_NEW_TODO':
            return {
                ...state, todos: {text: action.payload, completed: false}
            }
        default: return state
    }
}

export default rootReducers