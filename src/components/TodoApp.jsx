import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeTodoText, addNewTodo } from 'actions'

class TodoApp extends Component{
    render(){
        console.log()
        const {todoText, todos, changeTodoText} = this.props

        return (
            <div>
                <header>Todo App</header>

                <div className="taskbar">
                    <form onSubmit={(event) => addNewTodo(event.preventDefault())}>
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

                <div className="tasklist">
                    {todos.map((todo, index) => <h1 key={index}>{todo.text}</h1>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todoText: state.todoText,
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTodoText: bindActionCreators(changeTodoText, dispatch),
        addNewTodo: bindActionCreators(addNewTodo, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)