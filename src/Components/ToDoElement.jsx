import React from "react"

const ToDoElement = ({todo, id, onCheckedClicked, removeClick}) => (
    <div id={id}>
        <input type="checkbox" checked={todo.onChecked} onChange={() => onCheckedClicked(todo)}/>
        <label onClick={() => onCheckedClicked(todo)}>{todo.text}</label>
        <button onClick={removeClick}>Remove</button>
    </div>
)


export default ToDoElement