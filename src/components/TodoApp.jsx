import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeTodo } from 'actions'

class TodoApp extends Component{
    render(){

        const {todo, changeTodo} = this.props

        return (
            <div>
                <header>Todo App</header>

                <div className="taskbar">
                    <form>
                        <input
                            type="text"
                            placeholder="Add new Todo"
                            value={todo}
                            onChange={(event) => {
                                changeTodo(event.target.value)
                            }}
                        />
                        <button type="submit">Add todo</button>
                    </form>
                </div>

                <div className="tasklist">
                    {todo}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todo: state.todo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTodo: bindActionCreators(changeTodo, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)