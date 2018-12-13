import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/account/actions'

import styled from 'styled-components'
import {ValidatorForm} from 'react-material-ui-form-validator'
import * as md from '@material-ui/core/'
import * as icon from '@material-ui/icons/'
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'

import EmailInput from 'components/account/authorization/EmailInput'
import PasswordInput from 'components/account/authorization/PasswordInput'
import SignInButton from 'components/account/authorization/SignInButton'
import RegistrationButton from 'components/account/authorization/RegistrationButton'
import Snackbar from 'components/account/Snackbar'


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
const Form = styled(ValidatorForm)``;
const CardHeader = styled(md.CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AccountCircleIcon = styled(icon.AccountCircle)``;
const CardHeaderTitle = styled(md.Typography)``;
const InputsWrapper = styled(md.CardContent)`
  display: flex;
  flex-direction: column;
`;

//======================================================================================================================


class Authorization extends Component {
    state = {
        email: '',
        password: '',
        openSnackbar: false
    }

    componentWillReceiveProps(nextProps) {
        const {token, success} = nextProps.users

        if (success) {
            const {username, active} = nextProps.users.payload

            if (!active) {
                window.localStorage.setItem('user', username)
                nextProps.history.push('/verification')
            } else {
                window.localStorage.setItem('token', token)
                nextProps.history.push('/')
            }
        }
    }

    setValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    signIn = (event) => {
        event.preventDefault()
        const {email, password} = this.state

        this.props.signIn({email, password})

        if (this.props.errorMessage) {
            this.setState({openSnackbar: true})
        }
    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    }

    render() {
        const {email, password, openSnackbar} = this.state

        return (
            <Wrapper>
                <Card>
                    <Form onSubmit={this.signIn}>
                        <CardHeader>
                            <AccountCircleIcon color="disabled" style={{fontSize: 120}}/>
                            <CardHeaderTitle variant="h4">Sign in to your account</CardHeaderTitle>
                        </CardHeader>
                        <InputsWrapper>
                            <EmailInput
                                value={email}
                                setEmail={this.setValue}
                            />
                            <PasswordInput
                                value={password}
                                setPassword={this.setValue}
                            />
                        </InputsWrapper>
                        <SignInButton/>
                        <md.Divider/>
                        <RegistrationButton/>
                        <Snackbar
                            open={openSnackbar}
                            errorMessage={this.props.errorMessage}
                            handleCloseSnackbar={this.handleCloseSnackbar}
                        />
                    </Form>
                </Card>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.auth.users,
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps, {...actions})(Authorization)