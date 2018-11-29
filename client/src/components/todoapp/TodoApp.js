import React, {Component} from 'react'
import {Redirect} from "react-router-dom"
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'store/todos/actions'

import List from '@material-ui/core/List'

import Header from './header/Header'
import Preloader from './preloader/Preloader'
import TaskBar from './taskbar/TaskBar'
import TodoItem from './todoitem/TodoItem'


class TodoApp extends Component {
    state = {
        todoText: '',
        errorMessage: ''
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('id')

        this.props.fetchTodos(userId)
    }

    handleChange = (event) =>
        this.setState({
                todoText: event.target.value
            }
        )

    handleAddTodo = (event) => {
        event.preventDefault();

        const {todoText} = this.state

        if (todoText === '') {
            this.setState({
                errorMessage: 'Text field is require!'
            })
        } else {
            const todo = {
                title: todoText,
                completed: false,
                userId: window.localStorage.getItem('id')
            }

            this.props.addNewTodo(todo)

            this.setState({
                todoText: '',
                errorMessage: ''
            })
        }
    }

    handleLogOut = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('user')

        this.props.history.push('/auth')
    }

    render() {
        const {todos, isLoading, toggleTodo, deleteTodo} = this.props
        const {todoText, errorMessage} = this.state

        return (
            window.localStorage.getItem('token') &&
            window.localStorage.getItem('token') !== null &&
            window.localStorage.getItem('token') !== 'undefined' ?

                <div>
                    <Header
                        logOut={this.handleLogOut}
                        username={window.localStorage.getItem('user').toUpperCase()}
                        amountTodo={todos.length}
                    />
                    <TaskBar
                        AddTodoSubmit={this.handleAddTodo}
                        todoValue={todoText}
                        onChange={(event) => {
                            this.handleChange(event)
                        }}
                        errorMessage={errorMessage}
                    />
                    {isLoading ?
                        <Preloader/> :
                        <List component="nav">
                            {todos.map((todo) => {
                                return (
                                    <TodoItem
                                        key={todo._id}
                                        todo={todo}
                                        toggleTodoAction={toggleTodo}
                                        deleteTodoAction={deleteTodo}
                                    />
                                )
                            })}
                        </List>
                    }
                </div> : <Redirect to="/auth"/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.items,
        isLoading: state.todos.isFetching
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapActionToProps)(TodoApp)