import React from 'react'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListAlt from '@material-ui/icons/ListAlt';
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank';

const styles = {
    root: {
        width: 100 + '%',
        display: 'flex',
        justifyContent: 'space-around',
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    }
}

class Footer extends React.Component {
    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({value});
    }

    render() {

        const {classes} = this.props
        const {value} = this.state

        return (
            <AppBar position="fixed" color="inherit" className={classes.appBar}>
                <BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                    position="fixed"
                >
                    <BottomNavigationAction label="All" icon={<ListAlt/>}/>
                    <BottomNavigationAction label="Checked" icon={<CheckBox/>}/>
                    <BottomNavigationAction label="Unchecked" icon={<CheckBoxOutlineBlank/>}/>
                </BottomNavigation>
            </AppBar>
        )
    }
}


Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)