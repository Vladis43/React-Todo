import React from 'react'
import styled from 'styled-components'

import * as md from '@material-ui/core/'
import DeleteSweep from '@material-ui/icons/DeleteSweep'

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

const Header = (props) => {
    const {showClearButton, clearAll} = props
    return (
        <Root>
            <AppBar position="fixed" color="primary">
                <md.Toolbar>
                    <Typography variant="h6" color="inherit">
                        Todo App
                    </Typography>
                    <md.Button
                        color="inherit"
                        style={showClearButton}
                        onClick={clearAll}
                    >
                        <DeleteSweep />
                    </md.Button>
                </md.Toolbar>
            </AppBar>
        </Root>
    )
}

export default Header