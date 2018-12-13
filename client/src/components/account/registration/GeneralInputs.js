import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'
import {TextValidator} from 'react-material-ui-form-validator'


//Styled Components=====================================================================================================
const GeneralInputsField = styled(md.CardContent)`
  display: flex;
  flex-direction: column;
`;
const UsernameInput = styled(TextValidator)``;
const EmailInput = styled(TextValidator)``;
const PasswordField = styled.div`
    @media screen and (max-device-width: 455px) {
        display: flex;
        flex-direction: column;
        div {
          display: flex;
          margin-left: 0 !important;
        }
    }
`;
const PasswordInput = styled(TextValidator)``;
const PasswordConfirmInput = styled(TextValidator)``;
//======================================================================================================================


const GeneralInputs = (props) => {
    const {usernameValue, emailValue, passwordValue, passwordConfirmValue, setValue} = props

    return (
        <GeneralInputsField>
            <UsernameInput
                name="username"
                size="large"
                type="text"
                label="Username"
                style={{marginBottom: 10}}
                value={usernameValue}
                onChange={setValue}
                validators={['required', 'minStringLength: 3']}
                errorMessages={['this field is required', 'username must be at least 3 characters']}
            />
            <EmailInput
                name="email"
                size="large"
                type="text"
                label="Email"
                style={{marginBottom: 10}}
                value={emailValue}
                onChange={setValue}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
            />
            <PasswordField>
                <PasswordInput
                    name="password"
                    size="large"
                    type="password"
                    label="Password"
                    value={passwordValue}
                    onChange={setValue}
                    validators={['required', 'minStringLength:8']}
                    errorMessages={['this field is required', 'password must be at least 8 characters']}
                />
                <PasswordConfirmInput
                    name="passwordConfirm"
                    size="large"
                    type="password"
                    label="Confirm password"
                    style={{marginLeft: 20}}
                    value={passwordConfirmValue}
                    onChange={setValue}
                    validators={['required', 'isPasswordMatch']}
                    errorMessages={['this field is required', 'password do not match']}
                />
            </PasswordField>
        </GeneralInputsField>
    )
}

export default GeneralInputs