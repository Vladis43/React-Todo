import React from 'react'

const TaskBar = ({onSubmit, value, onChange, errorMessage}) => (
    <form onSubmit={onSubmit}>
        <input
            type="text"
            placeholder="Add new Todo"
            value={value}
            onChange={onChange}
        />
        <button type="submit">Add todo</button>
        <label style={{color: 'red'}}>{errorMessage}</label>
    </form>
)

export default TaskBar