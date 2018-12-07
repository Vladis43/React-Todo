import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import * as md from '@material-ui/core'

const Wrapper = styled(md.CardActions)`
  display: flex;
  justify-content: center;
`;
const Button = styled(md.Button)``;

const AuthorizationButton = ({loginLink}) => (
    <Wrapper>
        <Link to={'/authorization'} style={{textDecoration: "none"}} onClick={loginLink}>
            <Button style={{color: "#34409b"}}>
                Log In
            </Button>
        </Link>
    </Wrapper>
)

export default AuthorizationButton