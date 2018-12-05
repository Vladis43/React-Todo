import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'

const Input = styled(md.TextField)``;

const PasswordInput = ({value, setPassword, error}) => (
    <Input
        name="password"
        size="large"
        type="password"
        label="Password"
        style={{margin: 10}}
        value={value}
        onChange={setPassword}
        helperText={error}
        error={error ? true : false}
    />
)

export default PasswordInput