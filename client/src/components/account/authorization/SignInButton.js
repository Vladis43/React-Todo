import React from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core'

const ButtonWrapper = styled(md.CardActions)`
  display: flex;
  justify-content: flex-end;
  @media screen and (max-device-width: 400px) {
    justify-content: center;
  }
`;
const ConfirmButton = styled(md.Button)``;

const SignInButton = () => (
    <ButtonWrapper>
        <ConfirmButton
            variant="contained"
            size="large"
            color="primary"
            type="submit"
        >
            Sign In
        </ConfirmButton>
    </ButtonWrapper>
)

export default SignInButton