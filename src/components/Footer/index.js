import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { showAll, showChecked, showUnchecked } from 'actions'

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

    getVisibleAll = () => {
        const {todos, showAll} = this.props

        showAll(todos)
    }

    getVisibleChecked = () => {
        const {todos, showChecked} = this.props

        showChecked(todos.filter(todo => todo.completed))
    }

    getVisibleUnchecked = () => {
        const {todos, showUnchecked} = this.props

        showUnchecked(todos.filter(todo => !todo.completed))
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
                    <BottomNavigationAction onClick={this.getVisibleAll} label="All" icon={<ListAlt/>}/>
                    <BottomNavigationAction onClick={this.getVisibleChecked} label="Checked" icon={<CheckBox/>}/>
                    <BottomNavigationAction onClick={this.getVisibleUnchecked} label="Unchecked" icon={<CheckBoxOutlineBlank/>}/>
                </BottomNavigation>
            </AppBar>
        )
    }
}


Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        todos: state.todos.todos
    }
}

const mapActionToProps = (dispatch) => {
    return {
        showAll: bindActionCreators(showAll, dispatch),
        showChecked: bindActionCreators(showChecked, dispatch),
        showUnchecked: bindActionCreators(showUnchecked, dispatch),
    }
}

const witthStyles = withStyles(styles)(Footer)

export default connect(mapStateToProps, mapActionToProps)(witthStyles)