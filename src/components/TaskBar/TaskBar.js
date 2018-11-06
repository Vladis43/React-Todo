import React from 'react'
import './TaskBar.css'

import * as md from '@material-ui/core/'
import AddIcon from '@material-ui/icons/Add'


const TaskBar = ({onSubmit, value, onChange, errorMessage}) => {
    return (
        <form className="taskbar-form" onSubmit={onSubmit}>
            <div className="input-field">
                <md.TextField
                    size="large"
                    type="text"
                    label="Add new Todo"
                    fullWidth
                    helperText={errorMessage ? errorMessage : ''}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <md.Button
                color="primary"
                mini
                type="submit"
            >
                <AddIcon />
            </md.Button>
        </form>
    )
}

export default TaskBar