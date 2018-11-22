import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'store/authorization/actions'

import styled from 'styled-components'
import * as md from "@material-ui/core/"
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'
import {Link} from "react-router-dom"


class Registration extends Component{
    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        age: '',
        sex: '',
        country: '',
        city: '',
        token: null
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
        const {username, email, password, passwordConfirm, age, sex, country, city} = this.state

        return (
            <Wrapper>
                <Card>
                    <form method="POST" onSubmit={(event) => this.signUp(event)}>
                        <CardHeader>Create your account</CardHeader>
                        <GeneralInputsField>
                            <UsernameInput
                                size="large"
                                type="text"
                                label="Username"
                                style={{marginBottom: 10}}
                                value={username}
                                onChange={(event) => this.setUsername(event)}
                            />
                            <EmailInput
                                size="large"
                                type="text"
                                label="Email"
                                style={{marginBottom: 10}}
                                value={email}
                                onChange={(event) => this.setEmail(event)}
                            />
                            <div>
                                <PasswordInput
                                    size="large"
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={(event) => this.setPassword(event)}
                                />
                                <PasswordConfirmInput
                                    size="large"
                                    type="password"
                                    label="Confirm password"
                                    style={{marginLeft: 20}}
                                    value={passwordConfirm}
                                    onChange={(event) => this.setPasswordConfirm(event)}
                                />
                            </div>
                        </GeneralInputsField>

                        <DetailsInputsField>
                            <DetailsTitle>Details</DetailsTitle>
                            <div style={{marginBottom: 10}}>
                                <AgeInput
                                    size="large"
                                    type="text"
                                    label="Age"
                                    style={{marginRight: 20}}
                                    value={age}
                                    onChange={(event) => this.setAge(event)}
                                />
                                <SexInput
                                    size="large"
                                    type="text"
                                    label="Sex"
                                    value={sex}
                                    onChange={(event) => this.setSex(event)}
                                />
                            </div>
                            <div>
                                <CountryInput
                                    size="large"
                                    type="text"
                                    label="Coutry"
                                    style={{marginRight: 20}}
                                    value={country}
                                    onChange={(event) => this.setCountry(event)}
                                />
                                <CityInput
                                    size="large"
                                    type="text"
                                    label="City"
                                    value={city}
                                    onChange={(event) => this.setCity(event)}
                                />
                            </div>
                        </DetailsInputsField>

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
        success: state.auth.users.success
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
const DetailsTitle = styled(md.Typography)``;
const GeneralInputsField = styled(md.CardContent)`
  display: flex;
  flex-direction: column;
`;
const UsernameInput = styled(md.TextField)``;
const EmailInput = styled(md.TextField)``;
const PasswordInput = styled(md.TextField)``;
const PasswordConfirmInput = styled(md.TextField)``;
const DetailsInputsField = styled(md.CardContent)`
  @media screen and (max-device-width: 455px) {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
    }
  }
`;
const AgeInput = styled(md.TextField)``;
const SexInput = styled(md.TextField)``;
const CountryInput = styled(md.TextField)``;
const CityInput = styled(md.TextField)``;
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