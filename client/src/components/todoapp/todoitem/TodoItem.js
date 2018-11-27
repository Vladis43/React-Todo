import React from 'react'
import styled from "styled-components"

import * as md from '@material-ui/core/'
import ClearIcon from '@material-ui/icons/Clear'

const TodoListContainer = styled.div`
  display: flex;
`;

const TodoItem = (props) => {
    const {todo, toggleTodoAction, deleteTodoAction} = props
    return (
        <TodoListContainer>
            <md.Checkbox
                color="primary"
                checked={todo.completed}
                onChange={() => toggleTodoAction(todo._id, todo.completed)}
            />
            <md.ListItem button onClick={() => toggleTodoAction(todo._id, todo.completed)}>
                <md.ListItemText
                    primary={todo.title}
                    style={todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}/>
            </md.ListItem>
            <md.Button
                mini
                color="secondary"
                onClick={() => deleteTodoAction(todo._id)}
            >
                <ClearIcon/>
            </md.Button>
        </TodoListContainer>
    )
}

export default TodoItem