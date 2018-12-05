import React from 'react'
import {Link} from "react-router-dom"
import styled from 'styled-components'
import * as md from '@material-ui/core'

const ButtonWrapper = styled(md.CardActions)`
  display: flex;
  justify-content: center;
`;
const Button = styled(md.Button)``;

const RegistrationButton = () => (
    <ButtonWrapper>
        <Link to={'/registration'} style={{textDecoration: "none"}}>
            <Button style={{color: "#34409b"}}>
                Create an account
            </Button>
        </Link>
    </ButtonWrapper>
)

export default RegistrationButton