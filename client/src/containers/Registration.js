import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/account/actions'

import styled from 'styled-components'
import * as md from "@material-ui/core/"
import {ValidatorForm} from 'react-material-ui-form-validator'
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'

import GeneralInputs from 'components/account/registration/GeneralInputs'
import DetailsInputs from 'components/account/registration/DetailsInputs'
import SingUpButton from 'components/account/registration/SingUpButton'
import AuthorizationButton from 'components/account/registration/AuthorizationButton'
import Snackbar from 'components/Snackbar'


//Styled Components=====================================================================================================
const time = new Date().getHours()
const Wrapper = styled.div`
  background:url("${time > 7 && time < 18 ? backgroundImage : backgroundImageNight}") 0 0 / 100% no-repeat;

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
const Form = styled(ValidatorForm)``;
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
        sex: 'male',
        country: '',
        city: '',
        openSnackbar: false
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        })
    }

    componentWillReceiveProps(nextProps) {
        const {success, payload} = nextProps.users

        if (nextProps.isError) {
            this.setState({openSnackbar: true})
        }

        if (success) {
            window.localStorage.setItem('user', payload.username)
            nextProps.history.push('/verification')
        }
    }

    setValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

        this.setState({
            selectError: ''
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

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({openSnackbar: false});
    }

    render() {
        const {username, email, password, passwordConfirm, age, sex, country, city, openSnackbar} = this.state

        return (
            <Wrapper>
                <Card>
                    <Form onSubmit={this.signUp}>
                        <CardHeader>Create your account</CardHeader>
                        <GeneralInputs
                            usernameValue={username}
                            emailValue={email}
                            passwordValue={password}
                            passwordConfirmValue={passwordConfirm}
                            setValue={this.setValue}
                        />
                        <DetailsInputs
                            ageValue={age}
                            sexValue={sex}
                            countryValue={country}
                            cityValue={city}
                            setValue={this.setValue}
                        />
                        <SingUpButton/>
                        <md.Divider/>
                        <AuthorizationButton/>
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
        errorMessage: state.auth.errorMessage,
        isError: state.auth.isError
    }
}

export default connect(mapStateToProps, {...actions})(Registration)