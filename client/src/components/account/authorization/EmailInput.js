import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'

const Input = styled(md.TextField)``;

const EmailInput = ({value, setEmail, error}) => (
    <Input
        name="email"
        size="large"
        type="text"
        label="Email"
        style={{margin: 10}}
        value={value}
        onChange={setEmail}
        helperText={error}
        error={error ? true : false}
    />
)

export default EmailInput