import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from 'store/account/actions'
import styled from 'styled-components'
import * as md from '@material-ui/core/'
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'

import ConfirmField from '../components/account/verification/ConfirmField'
import AuthorizationButton from '../components/account/verification/AuthorizationButton'


//Styled Components=====================================================================================================
const time = new Date().getHours()
const Wrapper = styled.div`
  background:url("${time > 7 && time < 18 ? backgroundImage : backgroundImageNight}")  no-repeat;

  width: 100vw;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Card = styled(md.Card)`
  @media screen and (max-device-width: 400px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background:url("${time > 7 && time < 18 ? backgroundImage : backgroundImageNight}")  no-repeat;
  }
`;
const CardHeader = styled(md.CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CardHeaderTitle = styled(md.Typography)``;
const TextField = styled(md.CardContent)``;
//======================================================================================================================


class Verification extends Component {
    state = {
        code: '',
        errorMessage: ''
    }

    componentWillReceiveProps(nextProps) {
        const {token, success} = nextProps.users

        if (success) {
            window.localStorage.setItem('token', token)
            nextProps.history.push('/')
        } else {
            this.setState({
                errorMessage: 'Wrong verification code!'
            })
        }
    }

    setCode = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    verification = (event) => {
        event.preventDefault()
        const {code} = this.state
        const user = window.localStorage.getItem('user')

        if (code === '') {
            this.setState({
                errorMessage: 'Field is required!'
            })
        } else {
            this.props.verification(user, code)
            window.localStorage.removeItem('user')
        }
    }

    loginLink = () => {
        window.localStorage.removeItem('user')
    }

    render() {
        const user = window.localStorage.getItem('user')

        if (!user) {
            return <Redirect to='/authorization'/>
        }

        return (
            <Wrapper>
                <Card>
                    <form onSubmit={this.verification}>
                        <CardHeader>
                            <CardHeaderTitle variant="h4">Please, confirm your email!</CardHeaderTitle>
                        </CardHeader>
                        <TextField>
                            <md.Typography color="textSecondary">
                                Check your email for verification code.
                            </md.Typography>
                        </TextField>
                        <ConfirmField
                            codeValue={this.state.code}
                            setCode={this.setCode}
                            errorMessage={this.state.errorMessage}
                        />
                        <md.Divider/>
                        <AuthorizationButton loginLink={this.loginLink}/>
                    </form>
                </Card>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.auth.users,
        error: state.auth.errorMessage
    }
}

export default connect(mapStateToProps, {...actions})(Verification)