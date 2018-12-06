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
          margin-left: 0 !important;
        }
    }
`;
const PasswordInput = styled(md.TextField)``;
const PasswordConfirmInput = styled(md.TextField)``;
//======================================================================================================================


const GeneralInputs = (props) => {
    const {usernameValue, emailValue, passwordValue, passwordConfirmValue, setValue, errorMessage} = props

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
                helperText={errorMessage.username}
                error={errorMessage.username ? true : false}
            />
            <EmailInput
                name="email"
                size="large"
                type="text"
                label="Email"
                style={{marginBottom: 10}}
                value={emailValue}
                onChange={setValue}
                helperText={errorMessage.email}
                error={errorMessage.email ? true : false}
            />
            <PasswordField>
                <PasswordInput
                    name="password"
                    size="large"
                    type="password"
                    label="Password"
                    value={passwordValue}
                    onChange={setValue}
                    helperText={errorMessage.password}
                    error={errorMessage.password ? true : false}
                />
                <PasswordConfirmInput
                    name="passwordConfirm"
                    size="large"
                    type="password"
                    label="Confirm password"
                    style={{marginLeft: 20}}
                    value={passwordConfirmValue}
                    onChange={setValue}
                    helperText={errorMessage.passwordConfirm}
                    error={errorMessage.passwordConfirm ? true : false}
                />
            </PasswordField>
        </GeneralInputsField>
    )
}

export default GeneralInputs