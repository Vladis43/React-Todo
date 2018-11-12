import React from 'react'
import styled from "styled-components"

import * as md from '@material-ui/core/'
import AddIcon from '@material-ui/icons/Add'

const AddTodoForm = styled.form`
    display: flex;
    padding-top: 70px;
    padding-bottom: 15px;
    padding-right: 0;
    padding-left: 48px;
`;

const InputField = styled.div`
    width: 100%;
`;

const TaskBar = ({AddTodoSubmit, todoValue, onChange, errorMessage}) => {
    return (
        <AddTodoForm onSubmit={AddTodoSubmit}>
            <InputField>
                <md.TextField
                    size="large"
                    type="text"
                    label="Add new Todo"
                    fullWidth
                    helperText={errorMessage ? errorMessage : ''}
                    value={todoValue}
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
        </AddTodoForm>
    )
}

export default TaskBar