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
        if(localStorage.getItem('local-todos')){
            this.props.getLocalStorage(JSON.parse(localStorage.getItem('local-todos')))
        }


        // fetch('http://jsonplaceholder.typicode.com/todos/')
        //     .then((response) => response.json())
        //     .then((json) => this.props.getTodo(json))
    }

    handleAddTodo = (event) => {
        event.preventDefault();

        const {todoText, todos, errorMessage, addNewTodo, changeErrorMessage, changeTodoText} = this.props

        if(todoText === ''){
            changeErrorMessage('Text field is required!')
        } else {
            addNewTodo([...todos, {id: uuidv4(), completed: false, title: todoText}])
            changeTodoText('')
            if (errorMessage !== '') {
                changeErrorMessage('')
            }
        }
    }


    render(){

        const {todoText, todos, errorMessage, toggleTodo, deleteTodo, clearAll, changeTodoText} = this.props

        return (
            <div>
                <Header
                    onClick={clearAll}
                    style={todos.length === 0 ? {display: 'none'} : {display: 'block'}}
                />
                <TaskBar
                    onSubmit={this.handleAddTodo}
                    value={todoText}
                    onChange={(event) => {
                        changeTodoText(event.target.value)
                    }}
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