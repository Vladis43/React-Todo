import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as actions from 'store/auth/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core/'
import * as icon from '@material-ui/icons/'
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'


class Authorization extends Component{
    state = {
        email: '',
        password: ''
    }

    setEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    setPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    signIn = (event) => {
        event.preventDefault()
        const {email, password} = this.state

        this.props.signIn({email, password})
    }

    componentWillReceiveProps(nextProps) {
        window.localStorage.setItem('token', nextProps.token)
        window.localStorage.setItem('id', nextProps.id)

        if (nextProps.success) {
            nextProps.history.push('/')
        }
    }

    render() {
        const {email, password} = this.state

        return (
            <Wrapper>
                <Card>
                    <form method="POST" onSubmit={(event) => this.signIn(event)}>
                        <CardHeader>
                            <AccountCircleIcon color="disabled" style={{fontSize: 120}}/>
                            <CardHeaderTitle variant="display1">Sign in to your account</CardHeaderTitle>
                        </CardHeader>

                        <InputsField>
                            <EmailInput
                                size="large"
                                type="text"
                                label="Email"
                                style={{margin: 10}}
                                value={email}
                                onChange={(event) => this.setEmail(event)}
                            />
                            <PasswordInput
                                size="large"
                                type="password"
                                label="Password"
                                style={{margin: 10}}
                                value={password}
                                onChange={(event) => this.setPassword(event)}
                            />
                        </InputsField>

                        <SignInField>
                            <ConfirmButton
                                variant="contained"
                                size="large"
                                color="primary"
                                type="submit"
                            >
                                Sign In
                            </ConfirmButton>
                        </SignInField>

                        <md.Divider />

                        <RegistrationField>
                                <Link to={'/reg'} style={{textDecoration: "none"}}>
                                    <RegistrationButton style={{color: "#34409b"}}>
                                        Create an account
                                    </RegistrationButton>
                                </Link>
                        </RegistrationField>
                    </form>
                </Card>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.users.token,
        success: state.auth.users.success,
        id: state.auth.users.id
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}


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
const AccountCircleIcon = styled(icon.AccountCircle)``;
const CardHeaderTitle = styled(md.Typography)``;
const InputsField = styled(md.CardContent)`
  display: flex;
  flex-direction: column;
`;
const EmailInput = styled(md.TextField)``;
const PasswordInput = styled(md.TextField)``;
const SignInField = styled(md.CardActions)`
  display: flex;
  justify-content: flex-end;
  @media screen and (max-device-width: 400px) {
    justify-content: center;
  }
`;
const ConfirmButton = styled(md.Button)``;
const RegistrationField = styled(md.CardActions)`
  display: flex;
  justify-content: center;
`;
const RegistrationButton = styled(md.Button)``;
//======================================================================================================================


export default connect(mapStateToProps, mapActionToProps)(Authorization)