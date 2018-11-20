import React from 'react'
import styled from 'styled-components'

import * as md from '@material-ui/core/'

const AppBar = styled(md.AppBar)`
  top: 0;
  bottom: auto;
`;

const Root = styled.div`
  flex-grow: 1;
`;

const Typography = styled(md.Typography)`
  flex-grow: 1;
`;

const Header = () => {
    return (
        <Root>
            <AppBar position="fixed" color="primary">
                <md.Toolbar>
                    <Typography variant="h6" color="inherit">
                        Todo App
                    </Typography>
                    <md.Button color="inherit">
                        Login
                    </md.Button>
                </md.Toolbar>
            </AppBar>
        </Root>
    )
}

export default Header