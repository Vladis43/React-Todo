import React from 'react'
import {Link} from "react-router-dom"
import styled from 'styled-components'
import * as md from '@material-ui/core'

const Wrapper = styled(md.CardActions)`
  display: flex;
  justify-content: center;
`;
const Button = styled(md.Button)``;

const RegistrationButton = () => (
    <Wrapper>
        <Link to={'/registration'} style={{textDecoration: "none"}}>
            <Button style={{color: "#34409b"}}>
                Create an account
            </Button>
        </Link>
    </Wrapper>
)

export default RegistrationButton