import React from 'react'

import * as md from '@material-ui/core/'
import DeleteSweep from '@material-ui/icons/DeleteSweep'


const Header = (props) => {
    const {style, onClick} = props
    return (
        <div style={{flexGrow: 1}}>
            <md.AppBar position="fixed" color="primary" style={{top: 0, bottom: 'auto'}}>
                <md.Toolbar>
                    <md.Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                        Todo App
                    </md.Typography>
                    <md.Button
                        color="inherit"
                        style={style}
                        onClick={onClick}
                    >
                        <DeleteSweep />
                    </md.Button>
                </md.Toolbar>
            </md.AppBar>
        </div>
    )
}

export default Header