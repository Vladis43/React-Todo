import React, {Component} from 'react'
import styled from 'styled-components'

import * as md from '@material-ui/core/'
import * as icon from '@material-ui/icons'


//Styled Components=====================================================================================================
//new version material ui typography
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true
const AppBar = styled(md.AppBar)`
  top: 0;
  bottom: auto;
  position: fixed;
`;
const Root = styled.div`
  flex-grow: 1;
`;
const Typography = styled(md.Typography)`
  flex-grow: 1;
`;

//======================================================================================================================


class Header extends Component {

    LogOut = () => {
        window.localStorage.removeItem('token')
        this.props.history.push('/authorization')
    }

    render() {
        return (
            <Root>
                <AppBar color="primary">
                    <md.Toolbar>
                        <Typography variant="h6" color="inherit">
                            Todo App
                        </Typography>
                        <Typography variant="h6" color="inherit">
                            {this.props.username.toUpperCase()}
                        </Typography>
                        <md.Tooltip title="Log out">
                            <md.Button
                                color="inherit"
                                aria-label="Log out"
                                onClick={this.LogOut}
                            >
                                <icon.Input/>
                            </md.Button>
                        </md.Tooltip>
                    </md.Toolbar>
                </AppBar>
            </Root>
        )
    }
}

export default Header