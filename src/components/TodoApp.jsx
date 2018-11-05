import React, {Component} from 'react'
import uuidv4 from 'uuid'
import List from '@material-ui/core/List'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeTodoText, addNewTodo, toggleTodo, deleteTodo, clearAll, changeErrorMessage, getLocalStorage } from 'actions'

import Header from './Header'
import TaskBar from './TaskBar'
import TodoItem from './TodoItem'
import Footer from './Footer'


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

        const {todoText, todos, errorMessage, addNewTodo, changeErrorMessage, changeTodoText} = this.props
        const idItem = uuidv4()

        if(todoText === ''){
            changeErrorMessage('Text field is required!')
        } else {
            addNewTodo([...todos, {id: idItem, complete: false, text: todoText}])
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
                                checked={todo.complete}
                                onChange={() => toggleTodo(todo.id)}
                                onClickLabel={() => toggleTodo(todo.id)}
                                onClickButton={() => deleteTodo(todo.id)}
                                style={todo.complete ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}
                                todo={todo.text}
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
        todoText: state.todos.todoText,
        todos: state.todos.todos,
        errorMessage: state.todos.errorMessage
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