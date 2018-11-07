const initialState = {
    items: []
}

const todosReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODO':
            return {
                ...state, items: action.payload
            }
        case 'ADD_NEW_TODO':
            return {
                ...state, items: [...state.items, action.payload]
            }

        case 'TOGGLE_TODO':
            const toggledTodo = state.items.map((todoItem) =>
                action.payload === todoItem.id ? {...todoItem, completed: !todoItem.completed} : todoItem
            )
            return {
                ...state, items: toggledTodo
            }

        case 'DELETE_TODO':
            const deletedTodo = state.items.filter((todo) =>
                todo.id !== action.payload
            )
            return {
                ...state, items: deletedTodo
            }

        case 'CLEAR_ALL':
            return {
                ...state, items: []
            }

        default: return state
    }
}

export default todosReducers