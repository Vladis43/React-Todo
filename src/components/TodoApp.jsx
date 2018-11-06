import React, {Component} from 'react'
import uuidv4 from 'uuid'

import List from '@material-ui/core/List'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from 'actions'

import Header from './Header/Header'
import TaskBar from './TaskBar/TaskBar'
import TodoItem from './TodoItem/TodoItem'
import Footer from './Footer/Footer'


class TodoApp extends Component{
    state = {
        todoText: '',
        errorMessage: ''
    }

    componentDidUpdate() {
        localStorage.setItem('local-todos', JSON.stringify(this.props.todos))
    }

    componentDidMount() {
        if (localStorage.getItem('local-todos')) {
            this.props.getDataFromLocalStorage(JSON.parse(localStorage.getItem('local-todos')))
        }
    }

    handleChange = (event) =>
        this.setState({
            todoText: event.target.value
        }
    )

    handleAddTodo = (event) => {
        event.preventDefault();

        const {todos, addNewTodo} = this.props
        const {todoText} = this.state

        if(todoText === ''){
            this.setState({
                errorMessage: 'Text field is require!'
            })
        } else {
            addNewTodo([...todos, {id: uuidv4(), completed: false, title: todoText}])
            this.setState({
                todoText: '',
                errorMessage: ''
            })
        }
    }


    render(){
        const {todos, toggleTodo, deleteTodo, clearAll} = this.props
        const {todoText, errorMessage} = this.state

        return (
            <div>
                <Header
                    onClick={clearAll}
                    style={todos.length === 0 ? {display: 'none'} : {display: 'block'}}
                />
                <TaskBar
                    onSubmit={this.handleAddTodo}
                    value={todoText}
                    onChange={(event) => {this.handleChange(event)}}
                    errorMessage={errorMessage}
                />
                <List component="nav" style={{marginBottom: 50}}>
                    {todos.map((todo) => {
                        return (
                            <TodoItem
                                key={todo.id}
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                onClickLabel={() => toggleTodo(todo.id)}
                                onClickButton={() => deleteTodo(todo.id)}
                                style={todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                                todo={todo.title}
                            />
                        )
                    })}
                </List>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todos.todos
    }
}

const mapActionToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapActionToProps)(TodoApp)