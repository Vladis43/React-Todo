import React from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteSweep from '@material-ui/icons/DeleteSweep'
import Button from "@material-ui/core/Button/Button"

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


const HeaderComponent = (props) => {
    const {style, onClick, classes} = props
    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Todo App
                    </Typography>
                    <Button
                        color="inherit"
                        style={style}
                        onClick={onClick}
                    >
                        <DeleteSweep />
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

HeaderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderComponent)