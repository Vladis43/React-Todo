import React from 'react'
import './header.css'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const HeaderComponent = () => (
    <AppBar position="static" >
        <Toolbar>
            <Typography variant="h6" color="inherit">

                <header className='header'>Todo App</header>

            </Typography>
        </Toolbar>
    </AppBar>
)

export default HeaderComponent