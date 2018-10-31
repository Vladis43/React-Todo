import React from 'react'

const TodoElement = ({todo, checkedClick, removeClick}) => (
    <div>
        <input type="checkbox" checked={todo.completed} onChange={() => checkedClick(todo)}/>
        <label onClick={() => checkedClick(todo)}>{todo.text}</label>
        <button onClick={removeClick}>Remove</button>
    </div>
)


export default TodoElement