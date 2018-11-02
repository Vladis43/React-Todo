import React, {Component} from 'react'
import uuidv4 from 'uuid'
import List from '@material-ui/core/List'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeTodoText, addNewTodo, toggleTodo, deleteTodo, clearAll, changeErrorMessage, getLocalStorage } from 'actions'

import HeaderComponent from './HeaderComponent'
import TaskBar from './TaskBar'
import TodoItem from './TodoItem'


class TodoApp extends Component{
    componentDidUpdate() {
        localStorage.setItem('local-todos', JSON.stringify(this.props.todos))
    }

    componentDidMount() {
        if(localStorage.getItem('local-todos')){
            this.props.getLocalStorage(JSON.parse(localStorage.getItem('local-todos')))
        }
    }

    handleAddTodo = (event) => {
        event.preventDefault();

        const {todoText, todos, addNewTodo, changeErrorMessage, changeTodoText} = this.props
        const idItem = uuidv4()

        if(todoText === ''){
            console.log('Text field is required!')
            changeErrorMessage('Text field is required!')
        } else {
            addNewTodo([...todos, {id: idItem, completed: false, text: todoText}])
            changeTodoText('')
            changeErrorMessage('')
        }
    }

    handleRemoveTodo = (id) => {
        const {todos, deleteTodo} = this.props

        deleteTodo(todos.filter((todo) => todo.id !== id))

    }

    handleToggleTodo = (id) => {
        const {todos, toggleTodo} = this.props

        toggleTodo(todos.map((todoItem) => id === todoItem.id ? {...todoItem, completed: !todoItem.completed} : todoItem))
    }

    handleClearAll = () => {
        const {clearAll, changeErrorMessage} = this.props

        clearAll([])
        changeErrorMessage('')
    }

    render(){

        const {todoText, todos, errorMessage, changeTodoText} = this.props

        return (
            <div>
                <HeaderComponent
                    onClick={this.handleClearAll}
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
                <List component="nav">
                    {todos.map((todo) => {
                        return (
                            <TodoItem
                                key={todo.id}
                                checked={todo.completed}
                                onChange={() => this.handleToggleTodo(todo.id)}
                                onClickLabel={() => this.handleToggleTodo(todo.id)}
                                onClickButton={() => this.handleRemoveTodo(todo.id)}
                                style={todo.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                                todo={todo.text}
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
        todoText: state.todoText,
        todos: state.todos,
        errorMessage: state.errorMessage
    }
}

const mapActionToProps = (dispatch) => {
    return {
        changeTodoText: bindActionCreators(changeTodoText, dispatch),
        addNewTodo: bindActionCreators(addNewTodo, dispatch),
        toggleTodo: bindActionCreators(toggleTodo, dispatch),
        deleteTodo: bindActionCreators(deleteTodo, dispatch),
        clearAll: bindActionCreators(clearAll, dispatch),
        changeErrorMessage: bindActionCreators(changeErrorMessage, dispatch),
        getLocalStorage: bindActionCreators(getLocalStorage, dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(TodoApp)