import React from 'react'
import styled from 'styled-components'
import {TextValidator} from 'react-material-ui-form-validator'

const Input = styled(TextValidator)``;

const EmailInput = ({value, setEmail}) => (
    <Input
        name="email"
        size="large"
        type="text"
        label="Email"
        style={{margin: 10}}
        value={value}
        onChange={setEmail}
        validators={['required', 'isEmail']}
        errorMessages={['this field is required', 'email is not valid']}
    />
)

export default EmailInput