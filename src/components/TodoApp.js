import React, {Component} from 'react'
import uuidv4 from 'uuid'

import List from '@material-ui/core/List'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'store/todos/actions'

import Header from './Header/Header'
import TaskBar from './TaskBar/TaskBar'
import TodoItem from './TodoItem/TodoItem'


class TodoApp extends Component{
    state = {
        todoText: '',
        errorMessage: ''
    }

    componentDidMount() {
        this.props.getTodo()
    }

    handleChange = (event) =>
        this.setState({
            todoText: event.target.value
        }
    )

    handleAddTodo = (event) => {
        event.preventDefault();

        const {addNewTodo} = this.props
        const {todoText} = this.state

        if(todoText === ''){
            this.setState({
                errorMessage: 'Text field is require!'
            })
        } else {
            addNewTodo({id: uuidv4(), completed: false, title: todoText})
            this.setState({
                todoText: '',
                errorMessage: ''
            })
        }
    }

    render() {
        const {todos, toggleTodo, deleteTodo, clearAll} = this.props
        const {todoText, errorMessage} = this.state

        return (
            <div>
                <Header
                    onClick={clearAll}
                    style={todos.length === 0 ? {display: 'none'} : {display: 'block'}}
                />
                <TaskBar
                    AddTodoSubmit={this.handleAddTodo}
                    todoValue={todoText}
                    onChange={(event) => {this.handleChange(event)}}
                    errorMessage={errorMessage}
                />
                <List component="nav">
                    {todos.map((todo) => {
                        return (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                toggleTodoAction={toggleTodo}
                                deleteTodoAction={deleteTodo}
                            />
                        )
                    })}
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.items
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapActionToProps)(TodoApp)