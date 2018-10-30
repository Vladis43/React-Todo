const initialState = {
    todoText: '',
    todos: [
        {text: 'todos 1', completed: false},
        {text: 'todos 2', completed: false}
    ]
}

// export const todoText = (state )

export const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    todo: action.payload
                }
            ]
        // case 'CHANGE_TODO':
        //     return [
        //         ...state,
        //         {
        //             todo: action.payload
        //         }
        //     ]
        default:
            return state
    }
}