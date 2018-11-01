import React from 'react'

const TodoItem = ({checked, onChange, onClickLabel, onClickButton, todo}) => (
    <div>
        <input type="checkbox" checked={checked} onChange={onChange}/>
        <label onClick={onClickLabel}>{todo}</label>
        <button onClick={onClickButton}>Remove Todo</button>
    </div>
)

export default TodoItem