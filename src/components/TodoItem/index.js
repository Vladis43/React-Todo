import React from 'react'

const TodoItem = ({key, checked, onChange, onClickLabel, onClickButton, todo}) => (
    <div key={key}>
        <input type="checkbox" checked={checked} onChange={onChange}/>
        <label onClick={onClickLabel}>{todo}</label>
        <button onClick={onClickButton}>Remove Todo</button>
    </div>
)

export default TodoItem