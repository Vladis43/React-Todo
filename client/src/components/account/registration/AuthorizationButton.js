import React from 'react'
import {Link} from "react-router-dom"
import styled from 'styled-components'
import * as md from '@material-ui/core'

const ButtonWrapper = styled(md.CardActions)`
  display: flex;
  justify-content: center;
`;
const Title = styled(md.Typography)``;
const Button = styled(md.Button)``;

const AuthorizationButton = () => (
    <ButtonWrapper>
        <Title>Already have an account?</Title>
        <Link to={'/authorization'} style={{textDecoration: "none"}}>
            <Button style={{color: "#34409b"}}>
                Sign in
            </Button>
        </Link>
    </ButtonWrapper>
)

export default AuthorizationButton