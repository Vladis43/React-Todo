import React, {Component} from 'react'
import styled from 'styled-components'
import * as md from '@material-ui/core/'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomepageTitle = styled(md.Typography)``;

const Card = styled(md.Card)`
  width: 500px;
`;

const CardContent = styled(md.CardContent)`
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled(md.Button)`
  width: 100%;
`;

class Homepage extends Component{
    render() {
        return (
            <Wrapper>
                <HomepageTitle variant="display3" color="primary" style={{marginTop: 100, marginBottom: 150}}>Todo App</HomepageTitle>
                <Card>
                    <md.CardActionArea>
                        <md.AppBar position="static" color="primary">
                            <md.Toolbar>
                                <md.Typography variant="h6" color="inherit">
                                    Login
                                </md.Typography>
                            </md.Toolbar>
                        </md.AppBar>
                    </md.CardActionArea>

                    <CardContent>
                        <md.TextField
                            size="large"
                            type="text"
                            label="Email"
                            style={{margin: 10}}
                        />
                        <md.TextField
                            size="large"
                            type="password"
                            label="Password"
                            style={{margin: 10}}
                        />
                    </CardContent>

                    <md.CardActions>
                        <LoginButton
                            variant="contained"
                            size="large"
                            color="primary"
                        >
                            Login
                        </LoginButton>
                    </md.CardActions>
                </Card>
            </Wrapper>
        )
    }
}

export default Homepage