import React from 'react'
import './TodoItem.css'

import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Clear'

import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const TodoItem = ({checked, onChange, onClickLabel, onClickButton, todo}) => (
    <div className="todo-item-container">
        <Checkbox
            color="primary"
            checked={checked}
            onChange={onChange}
        />
        <ListItem button onClick={onClickLabel}>
                <ListItemText primary={todo} />
        </ListItem>
        <Button
            mini
            color="secondary"
            onClick={onClickButton}
        >
            <ClearIcon />
        </Button>
    </div>
)

export default TodoItem