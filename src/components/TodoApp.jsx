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
            addNewTodo([...todos, {text: todoText, id: idItem, completed: false}])
            changeTodoText('')
            changeErrorMessage('')
        }
    }

    handleRemoveTodo = (index) => {
        const {todos, deleteTodo} = this.props

        deleteTodo(todos.filter((callback, indexItem) => indexItem !== index))

    }

    handleToggleTodo = (index) => {
        const {todos, toggleTodo} = this.props

        toggleTodo(todos.map((todoItem, indexItem) => index === indexItem ? {...todoItem, completed: !todoItem.completed} : todoItem))
    }

    handleClearAll = () => {
        const {clearAll} = this.props

        clearAll([])
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
                    {todos.map((todo, index) => {
                        return (
                            <TodoItem
                                key={index}
                                checked={todo.completed}
                                onChange={() => this.handleToggleTodo(index)}
                                onClickLabel={() => this.handleToggleTodo(index)}
                                onClickButton={() => this.handleRemoveTodo(index)}
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