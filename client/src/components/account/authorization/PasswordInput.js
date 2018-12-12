import React from 'react'
import styled from 'styled-components'
import {TextValidator} from 'react-material-ui-form-validator'

const Input = styled(TextValidator)``;

const PasswordInput = ({value, setPassword}) => (
    <Input
        name="password"
        size="large"
        type="password"
        label="Password"
        style={{margin: 10}}
        value={value}
        onChange={setPassword}
        validators={['required', 'minStringLength:8']}
        errorMessages={['this field is required', 'password must be at least 8 characters']}
    />
)

export default PasswordInput