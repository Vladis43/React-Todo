import React, {Component} from 'react'
import uuidv4 from 'uuid'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeTodoText, addNewTodo, toggleTodo, deleteTodo, changeErrorMessage } from 'actions'

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
                <header>Todo App</header>

                <div className="taskbar">
                    <form onSubmit={this.handleAddTodo}>
                        <input
                            type="text"
                            placeholder="Add new Todo"
                            value={todoText}
                            onChange={(event) => {
                                changeTodoText(event.target.value)
                            }}
                        />
                        <button type="submit">Add todo</button>
                    </form>
                </div>

                <label style={{color: 'red'}}>{errorMessage}</label>

                <div className="tasklist">
                    {todos.map((todo, index) => {
                        return (
                            <div key={index}>
                                <input type="checkbox" checked={todo.completed} onChange={() => this.handleToggleTodo(index)}/>
                                <label onClick={() => this.handleToggleTodo(index)}>{todo.text}</label>
                                <button onClick={() => this.handleRemoveTodo(index)}>Remove Todo</button>
                            </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        changeTodoText: bindActionCreators(changeTodoText, dispatch),
        addNewTodo: bindActionCreators(addNewTodo, dispatch),
        toggleTodo: bindActionCreators(toggleTodo, dispatch),
        deleteTodo: bindActionCreators(deleteTodo, dispatch),
        changeErrorMessage: bindActionCreators(changeErrorMessage, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)