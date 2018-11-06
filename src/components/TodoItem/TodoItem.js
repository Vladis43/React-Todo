import React from 'react'
import './TodoItem.css'

import * as md from '@material-ui/core/'
import ClearIcon from '@material-ui/icons/Clear'

const TodoItem = ({checked, onChange, onClickLabel, onClickButton, style, todo}) => (
    <div className="todo-item-container">
        <md.Checkbox
            color="primary"
            checked={checked}
            onChange={onChange}
        />
        <md.ListItem button onClick={onClickLabel}>
                <md.ListItemText primary={todo} style={style} />
        </md.ListItem>
        <md.Button
            mini
            color="secondary"
            onClick={onClickButton}
        >
            <ClearIcon />
        </md.Button>
    </div>
)

export default TodoItem