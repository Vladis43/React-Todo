import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from 'store/account/actions'
import styled from 'styled-components'
import * as md from '@material-ui/core/'
import {ValidatorForm} from 'react-material-ui-form-validator'
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'

import ConfirmField from '../components/account/verification/ConfirmField'
import AuthorizationButton from '../components/account/verification/AuthorizationButton'
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
const CardHeaderTitle = styled(md.Typography)``;
const TextField = styled(md.CardContent)``;

//======================================================================================================================


class Verification extends Component {
    state = {
        code: '',
        openSnackbar: false
    }

    componentDidMount() {
        const user = window.localStorage.getItem('user')

        if (!user) {
            this.props.history.push('/authorization')
        }
    }

    componentWillReceiveProps(nextProps) {
        const {token, success} = nextProps.users

        if (nextProps.isError) {
            this.setState({openSnackbar: true})
        }

        if (success) {
            window.localStorage.removeItem('user')
            window.localStorage.setItem('token', token)
            nextProps.history.push('/')
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

        this.props.verification(user, code)

    }

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openSnackbar: false });
    }

    loginLink = () => {
        window.localStorage.removeItem('user')
    }

    render() {
        return (
            <Wrapper>
                <Card>
                    <Form onSubmit={this.verification}>
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
                        />
                        <md.Divider/>
                        <AuthorizationButton loginLink={this.loginLink}/>
                        <Snackbar
                            open={this.state.openSnackbar}
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

export default connect(mapStateToProps, {...actions})(Verification)