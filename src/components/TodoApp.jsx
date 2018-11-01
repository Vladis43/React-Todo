import React, {Component} from 'react'
import uuidv4 from 'uuid'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeTodoText, addNewTodo, toggleTodo, deleteTodo, changeErrorMessage } from 'actions'

import Header from "./Header"
import TaskBar from "./TaskBar"
import TodoItem from "./TodoItem"

class TodoApp extends Component{
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

    render(){

        const {todoText, todos, errorMessage, changeTodoText} = this.props

        return (
            <div>
                <Header />
                <TaskBar
                    onSubmit={this.handleAddTodo}
                    value={todoText}
                    onChange={(event) => {
                        changeTodoText(event.target.value)
                    }}
                    errorMessage={errorMessage}
                />
                <div className="tasklist">
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
                </div>
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
        changeErrorMessage: bindActionCreators(changeErrorMessage, dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(TodoApp)