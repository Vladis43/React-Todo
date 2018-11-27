import React, {Component} from 'react'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from 'store/auth/actions'

import styled from 'styled-components'
import * as md from '@material-ui/core/'
import backgroundImage from 'assets/todo-background.png'
import backgroundImageNight from 'assets/todo-background-night.png'


class Verification extends Component {
    render() {
        return (
            <Wrapper>
                <Card>
                    <form method="POST" onSubmit={(event) => this.signIn(event)}>
                        <CardHeader>
                            <CardHeaderTitle variant="h4">Please, confirm your email!</CardHeaderTitle>
                        </CardHeader>

                        <TextField>
                            <md.Typography color="textSecondary">
                                Check your email for verification code.
                            </md.Typography>
                        </TextField>

                        <ConfirmField>
                            <CodeInput
                                fullWidth
                                variant="outlined"
                                label="Enter code"
                                placeholder="Code..."
                            />
                            <ConfirmButton
                                variant="contained"
                                size="large"
                                color="primary"
                                type="submit"
                            >
                                Confirm
                            </ConfirmButton>
                        </ConfirmField>
                    </form>
                </Card>
            </Wrapper>
        )
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
  @media screen and (max-device-width: 400px) {
    justify-content: center;
  }
`;
const CodeInput = styled(md.TextField)``;
const ConfirmButton = styled(md.Button)``;
//======================================================================================================================


export default connect(null, mapActionToProps)(Verification)