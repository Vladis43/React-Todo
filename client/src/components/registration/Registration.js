import React, {Component} from 'react'
import Header from '../header/Header'
import styled from 'styled-components'

const RegField = styled.h2`
  display: flex;
  padding-top: 70px;
`;

class Registration extends Component{
    render() {
        return (
            <div>
                <Header/>
                <RegField>Registration</RegField>
            </div>
        )
    }
}

export default Registration