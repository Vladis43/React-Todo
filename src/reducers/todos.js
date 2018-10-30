export const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    text: 'some text'
                }
            ]
        default:
            return state
    }
}