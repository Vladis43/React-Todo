import React from 'react'
import styled from 'styled-components'

import * as md from '@material-ui/core/'
import * as icon from '@material-ui/icons'

//new version material ui typography
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

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

const Header = ({logOut, username}) => {
    return (
        <Root>
            <AppBar position="fixed" color="primary">
                <md.Toolbar>
                    <Typography variant="h6" color="inherit">
                        Todo App
                    </Typography>
                    <Typography color="inherit">
                        {username}
                    </Typography>
                    <md.Tooltip title="Log out">
                        <md.Button
                            color="inherit"
                            aria-label="Log out"
                            onClick={logOut}
                        >
                            <icon.Input/>
                        </md.Button>
                    </md.Tooltip>
                </md.Toolbar>
            </AppBar>
        </Root>
    )
}

export default Header