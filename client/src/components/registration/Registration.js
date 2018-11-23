import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import * as actions from 'store/auth/actions'

import styled from 'styled-components'
import * as md from "@material-ui/core/"
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'

import GeneralInputs from './generalinputs/GeneralInputs'
import DetailsInputs from './detailsinputs/DetailsInputs'


class Registration extends Component{
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        age: '',
        sex: '',
        country: '',
        city: ''
    }

    setUsername = (event) => {
        this.setState({
            username: event.target.value
        })
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

    setPasswordConfirm = (event) => {
        this.setState({
            passwordConfirm: event.target.value
        })
    }

    setAge = (event) => {
        this.setState({
            age: event.target.value
        })
    }

    setSex = (event) => {
        this.setState({
            sex: event.target.value
        })
    }

    setCountry = (event) => {
        this.setState({
            country: event.target.value
        })
    }

    setCity = (event) => {
        this.setState({
            city: event.target.value
        })
    }

    signUp = (event) => {
        event.preventDefault()
        const {username, email, password, passwordConfirm, age, sex, country, city} = this.state

        this.props.signUp({
            username,
            email,
            password,
            passwordConfirm,
            age,
            sex,
            country,
            city
        })
    }

    componentWillReceiveProps(nextProps) {
        window.localStorage.setItem('token', nextProps.token)
        window.localStorage.setItem('id', nextProps.id)

        if (nextProps.success) {
            nextProps.history.push('/')
        }
    }

    render() {
        const { username, email, password, passwordConfirm, age, sex, country, city } = this.state

        return (
            <Wrapper>
                <Card>
                    <form method="POST" onSubmit={(event) => this.signUp(event)}>
                        <CardHeader>Create your account</CardHeader>
                        <ErrorMessage
                            style={!this.props.error ? {display: 'none'} : {display: 'block'}}
                        >
                            {this.props.error}
                        </ErrorMessage>
                        <GeneralInputs
                            usernameValue={username}
                            emailValue={email}
                            passwordValue={password}
                            passwordConfirmValue={passwordConfirm}
                            setUsername={(event) => this.setUsername(event)}
                            setEmail={(event) => this.setEmail(event)}
                            setPassword={(event) => this.setPassword(event)}
                            setPasswordConfirm={(event) => this.setPasswordConfirm(event)}
                        />

                        <DetailsInputs
                            ageValue={age}
                            sexValue={sex}
                            countryValue={country}
                            cityValue={city}
                            setAge={(event) => this.setAge(event)}
                            setSex={(event) => this.setSex(event)}
                            setCountry={(event) => this.setCountry(event)}
                            setCity={(event) => this.setCity(event)}
                        />

                        <ConfirmField>
                            <ConfirmButton
                                variant="contained"
                                size="large"
                                color="primary"
                                type="submit"
                            >
                                Confirm
                            </ConfirmButton>
                        </ConfirmField>

                        <md.Divider />

                        <AuthorizationField>
                            <AuthorizationTitle>Already have an account?</AuthorizationTitle>
                                <Link to={'/auth'} style={{textDecoration: "none"}}>
                                    <AuthorizationButton style={{color: "#34409b"}}>
                                        Sign in
                                    </AuthorizationButton>
                                </Link>
                        </AuthorizationField>
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
        id: state.auth.users.id,
        error: state.auth.errorMessage
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
  @media screen and (max-device-width: 455px) {
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
  font-size: 28px;
`;
const ErrorMessage = styled(md.CardContent)`
  color: #d84940;
`;
const ConfirmField = styled(md.CardActions)`
  display: flex;
  justify-content: flex-end;
  @media screen and (max-device-width: 455px) {
    justify-content: center;
  }
`;
const ConfirmButton = styled(md.Button)``;
const AuthorizationField = styled(md.CardActions)`
  display: flex;
  justify-content: center;
`;
const AuthorizationTitle = styled(md.Typography)``;
const AuthorizationButton = styled(md.Button)``;
//======================================================================================================================

export default connect(mapStateToProps, mapActionToProps)(Registration)