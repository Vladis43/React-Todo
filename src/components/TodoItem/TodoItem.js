import React from 'react'
import './TodoItem.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'store/actions/actions'

import * as md from '@material-ui/core/'
import ClearIcon from '@material-ui/icons/Clear'



const TodoItem = (props) => {
    const {todo, toggleTodo, deleteTodo} = props
    return (
        <div className="todo-item-container">
            <md.Checkbox
                color="primary"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
            />
            <md.ListItem button onClick={() => toggleTodo(todo.id, todo.completed)}>
                    <md.ListItemText primary={todo.title}  style={todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}} />
            </md.ListItem>
            <md.Button
                mini
                color="secondary"
                onClick={() => deleteTodo(todo.id)}
            >
                <ClearIcon />
            </md.Button>
        </div>
    )
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(null, mapActionToProps)(TodoItem)