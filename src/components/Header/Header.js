import React from 'react'
import PropTypes from 'prop-types'

import * as md from '@material-ui/core/'
import DeleteSweep from '@material-ui/icons/DeleteSweep'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    appBar: {
        top: 0,
        bottom: 'auto',
    },
};


const Header = (props) => {
    const {style, onClick, classes} = props
    return (
        <div className={classes.root}>
            <md.AppBar position="fixed" color="primary" className={classes.appBar}>
                <md.Toolbar>
                    <md.Typography variant="h6" color="inherit" className={classes.grow}>
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

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default md.withStyles(styles)(Header)