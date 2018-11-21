import React, {Component} from 'react'
import styled from 'styled-components'
import * as md from "@material-ui/core/"
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'
import {Link} from "react-router-dom"


const time = new Date().getHours()

//Styled Components=====================================================================================================
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


class Registration extends Component{
    render() {
        return (
            <Wrapper>
                <Card>
                    <CardHeader>Create your account</CardHeader>
                    <GeneralInputsField>
                        <UsernameInput size="large" type="text" label="Username" style={{marginBottom: 10}}/>
                        <EmailInput size="large" type="text" label="Email" style={{marginBottom: 10}}/>
                        <div>
                            <PasswordInput size="large" type="password" label="Password"/>
                            <PasswordConfirmInput size="large" type="password" label="Confirm password" style={{marginLeft: 20}}/>
                        </div>
                    </GeneralInputsField>

                    <DetailsInputsField>
                        <DetailsTitle>Details</DetailsTitle>
                        <div style={{marginBottom: 10}}>
                            <AgeInput error={false} size="large" type="text" label="Age" style={{marginRight: 20}}/>
                            <SexInput size="large" type="text" label="Sex"/>
                        </div>
                        <div>
                            <CountryInput size="large" type="text" label="Coutry" style={{marginRight: 20}}/>
                            <CityInput size="large" type="text" label="City"/>
                        </div>
                    </DetailsInputsField>

                    <ConfirmField>
                        <ConfirmButton variant="contained" size="large" color="primary">Confirm</ConfirmButton>
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
                </Card>
            </Wrapper>
        )
    }
}

export default Registration