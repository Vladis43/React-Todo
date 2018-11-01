import React from 'react'
import './TaskBar.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';


const TaskBar = ({onSubmit, value, onChange, errorMessage}) => {
    return (
        <form className="taskbar-form" onSubmit={onSubmit}>
            <div className="input-field">
                <TextField
                    size="large"
                    type="text"
                    label="Add new Todo"
                    fullWidth
                    helperText={errorMessage ? errorMessage : ''}
                    value={value}
                    onChange={onChange}
                />
            </div>
            <Button
                color="primary"
                mini
                type="submit"
            >
                <AddIcon />
            </Button>
        </form>
    )
}

export default TaskBar