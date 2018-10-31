import React from 'react'

const AddTodo = ({value, onSubmit, onChange}) => (
    <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange}/>
        <button type="submit">Add</button>
    </form>
)

export default AddTodo