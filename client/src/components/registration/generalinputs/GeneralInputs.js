import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'


//Styled Components=====================================================================================================
const GeneralInputsField = styled(md.CardContent)`
  display: flex;
  flex-direction: column;
`;
const UsernameInput = styled(md.TextField)``;
const EmailInput = styled(md.TextField)``;
const PasswordField = styled.div`
    @media screen and (max-device-width: 455px) {
        display: flex;
        flex-direction: column;
        div {
          display: flex;
        }
        //material-ui class
        .fIhGog {
          margin-left: 0 !important;
        }
    }
`;
const PasswordInput = styled(md.TextField)``;
const PasswordConfirmInput = styled(md.TextField)``;
//======================================================================================================================


const GeneralInputs = (props) => {
    const { usernameValue, emailValue, passwordValue, passwordConfirmValue,
            setUsername, setEmail, setPassword, setPasswordConfirm,
            usernameError, emailError, passwordError, passwordConfirmError } = props

    return (
        <GeneralInputsField>
            <UsernameInput
                size="large"
                type="text"
                label="Username"
                style={{marginBottom: 10}}
                value={usernameValue}
                onChange={setUsername}
                helperText={usernameError}
                error={usernameError}
            />
            <EmailInput
                size="large"
                type="text"
                label="Email"
                style={{marginBottom: 10}}
                value={emailValue}
                onChange={setEmail}
                helperText={emailError}
                error={emailError}
            />
            <PasswordField>
                <PasswordInput
                    size="large"
                    type="password"
                    label="Password"
                    value={passwordValue}
                    onChange={setPassword}
                    helperText={passwordError}
                    error={passwordError}
                />
                <PasswordConfirmInput
                    size="large"
                    type="password"
                    label="Confirm password"
                    style={{marginLeft: 20}}
                    value={passwordConfirmValue}
                    onChange={setPasswordConfirm}
                    helperText={passwordConfirmError}
                    error={passwordConfirmError}
                />
            </PasswordField>
        </GeneralInputsField>
    )
}

export default GeneralInputs