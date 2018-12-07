import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/account/actions'

import styled from 'styled-components'
import * as md from "@material-ui/core/"
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'

import GeneralInputs from 'components/account/registration/GeneralInputs'
import DetailsInputs from 'components/account/registration/DetailsInputs'
import SingUpButton from 'components/account/registration/SingUpButton'
import AuthorizationButton from 'components/account/registration/AuthorizationButton'


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
  display: flex;
  justify-content: center;
  font-size: 28px;
`;
//======================================================================================================================


class Registration extends Component {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.users.success) {
            nextProps.history.push('/verification')
        }
    }

    setValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
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

    render() {
        const {username, email, password, passwordConfirm, age, sex, country, city} = this.state
        const {error} = this.props

        const errorMessages = {
            username: error.filter(error => error.param === 'username').map(error => error.msg)[0],
            email: error.filter(error => error.param === 'email').map(error => error.msg)[0],
            password: error.filter(error => error.param === 'password').map(error => error.msg)[0],
            passwordConfirm: error.filter(error => error.param === 'passwordConfirm').map(error => error.msg)[0],
            age: error.filter(error => error.param === 'age').map(error => error.msg)[0],
            sex: error.filter(error => error.param === 'sex').map(error => error.msg)[0],
            country: error.filter(error => error.param === 'country').map(error => error.msg)[0],
            city: error.filter(error => error.param === 'city').map(error => error.msg)[0]
        }

        return (
            <Wrapper>
                <Card>
                    <form onSubmit={this.signUp}>
                        <CardHeader>Create your account</CardHeader>
                        <GeneralInputs
                            usernameValue={username}
                            emailValue={email}
                            passwordValue={password}
                            passwordConfirmValue={passwordConfirm}
                            setValue={this.setValue}
                            errorMessage={errorMessages}
                        />
                        <DetailsInputs
                            ageValue={age}
                            sexValue={sex}
                            countryValue={country}
                            cityValue={city}
                            setValue={this.setValue}
                            errorMessage={errorMessages}
                        />
                        <SingUpButton/>
                        <md.Divider/>
                        <AuthorizationButton/>
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

const mapActionToProps = {...actions}

export default connect(mapStateToProps, mapActionToProps)(Registration)