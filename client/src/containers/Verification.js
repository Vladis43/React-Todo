import React, {Component} from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from 'store/account/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core/'
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'
import {Link} from "react-router-dom"


class Verification extends Component {
    state = {
        code: '',
        errorMessage: ''
    }

    setCode = (event) => {
        this.setState({
            code: event.target.value
        })
    }

    verification = (event) => {
        event.preventDefault()
        const {code} = this.state

        if (code === '') {
            this.setState({
                errorMessage: 'Field is required!'
            })
        } else {
            this.props.verification(code)
        }
    }

    loginLink = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('user')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success) {
            nextProps.history.push('/')
        } else {
            console.log(`Welcome user: ${window.localStorage.getItem('user')}`)
        }
    }

    render() {
        const errorMessages = {
            code: this.props.error.filter(error => error.param === 'verificationCode').map(error => error.msg)[0]
        }

        return (
            <Wrapper>
                <Card>
                    <form method="POST" onSubmit={(event) => this.verification(event)}>
                        <CardHeader>
                            <CardHeaderTitle variant="h4">Please, confirm your email!</CardHeaderTitle>
                        </CardHeader>

                        <TextField>
                            <md.Typography color="textSecondary">
                                Check your email for verification code.
                            </md.Typography>
                        </TextField>

                        <ConfirmField style={{marginBottom: 20}}>
                            <CodeInput
                                fullWidth
                                variant="outlined"
                                label="Enter code"
                                placeholder="Code..."
                                value={this.state.code}
                                onChange={(event) => this.setCode(event)}
                                helperText={errorMessages.code || this.state.errorMessage}
                                error={errorMessages.code || this.state.errorMessage ? true : false}
                            />
                            <ConfirmButton
                                variant="contained"
                                size="large"
                                color="primary"
                                type="submit"
                                style={{marginTop: 10}}
                            >
                                Confirm
                            </ConfirmButton>
                        </ConfirmField>

                        <md.Divider/>

                        <AuthorizationField>
                            <Link to={'/account'} style={{textDecoration: "none"}} onClick={this.loginLink}>
                                <AuthorizationButton style={{color: "#34409b"}}>
                                    Log In
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
        success: state.auth.users.success,
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
const ConfirmField = styled(md.CardActions)`
  display: flex;
  flex-direction: column;
  @media screen and (max-device-width: 400px) {
    justify-content: center;
  }
`;
const CodeInput = styled(md.TextField)``;
const ConfirmButton = styled(md.Button)`
  width: 100%;
`;
const AuthorizationField = styled(md.CardActions)`
  display: flex;
  justify-content: center;
`;
const AuthorizationButton = styled(md.Button)``;
//======================================================================================================================


export default connect(mapStateToProps, mapActionToProps)(Verification)