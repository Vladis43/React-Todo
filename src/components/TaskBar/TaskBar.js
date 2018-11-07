import React from 'react'

import { Form, InputField } from './TaskBarStyle'
import * as md from '@material-ui/core/'
import AddIcon from '@material-ui/icons/Add'


const TaskBar = ({onSubmit, value, onChange, errorMessage}) => {
    return (
        <Form onSubmit={onSubmit}>
            <InputField>
                <md.TextField
                    size="large"
                    type="text"
                    label="Add new Todo"
                    fullWidth
                    helperText={errorMessage ? errorMessage : ''}
                    value={value}
                    onChange={onChange}
                />
            </InputField>
            <md.Button
                color="primary"
                mini
                type="submit"
            >
                <AddIcon />
            </md.Button>
        </Form>
    )
}

export default TaskBar