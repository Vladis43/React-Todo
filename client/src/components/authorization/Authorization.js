import React, {Component} from 'react'
import Header from '../header/Header'
import styled from "styled-components"

const AuthField = styled.h2`
  display: flex;
  padding-top: 70px;
`;

class Authorization extends Component{
    render() {
        return (
            <div>
                <Header/>
                <AuthField>Authorization</AuthField>
            </div>
        )
    }
}

export default Authorization