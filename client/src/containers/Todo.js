import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from 'store/todos/actions'

import List from '@material-ui/core/List'

import Preloader from '../components/todo/Preloader'
import TaskBar from '../components/todo/TaskBar'
import TodoItem from '../components/todo/TodoItem'


class Todo extends Component {
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

    render() {
        const {todos, isLoading, toggleTodo, deleteTodo} = this.props
        const {todoText, errorMessage} = this.state

        return (
            <div>
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
            </div>
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

export default connect(mapStateToProps, mapActionToProps)(Todo)