import React from 'react'
import PropTypes from 'prop-types';

import * as md from '@material-ui/core/'
import * as mdicon from '@material-ui/icons/'

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
            <md.AppBar position="fixed" color="inherit" className={classes.appBar}>
                <md.BottomNavigation
                    value={value}
                    onChange={this.handleChange}
                    showLabels
                    className={classes.root}
                    position="fixed"
                >
                    <md.BottomNavigationAction label="All" icon={<mdicon.ListAlt/>}/>
                    <md.BottomNavigationAction label="Checked" icon={<mdicon.CheckBox/>}/>
                    <md.BottomNavigationAction label="Unchecked" icon={<mdicon.CheckBoxOutlineBlank/>}/>
                </md.BottomNavigation>
            </md.AppBar>
        )
    }
}


Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default md.withStyles(styles)(Footer)