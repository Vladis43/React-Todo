import React, {Component} from 'react'
import AddTodo from './AddTodo'
import TodoElement from './TodoElement'

import {connect} from 'react-redux'

// import {addTodo} from 'actions'
import {changeTodo} from "actions"


class Todo extends Component{
    //
    // componentDidUpdate() {
    //     localStorage.setItem('todos', JSON.stringify(this.props.todos))
    // }
    //
    // componentDidMount() {
    //     if(localStorage.todos){
    //         this.setState({
    //             todos: JSON.parse(localStorage.getItem('todos'))
    //         })
    //     }
    // }


    // handleChange = (event) => {
    //     this.setState({
    //         todoText: event.target.value
    //     })
    // }

    // handleAdd = (event) => {
    //     event.preventDefault()
    //
    //     if(this.state.todoText === ''){
    //         this.setState({
    //             errorMessage: 'Text field is required!'
    //         })
    //     } else {
    //         this.setState({
    //             todos: [...this.props.todos, {text: this.props.todoText, completed: false}],
    //             errorMessage: '',
    //             todoText: ''
    //         })
    //     }
    // }
    //
    // handleRemove = (index) => {
    //     this.setState({
    //         todos: this.props.todos.filter((callback, indexItem) => indexItem !== index)
    //     })
    // }
    //
    // handleClear = () => {
    //     this.setState({
    //         todos: []
    //     })
    // }
    //
    // handleChecked = (index) => {
    //     const todos = this.props.todos.map((todoItem, indexItem) => index === indexItem ? {...todoItem, completed: !todoItem.completed} : todoItem)
    //     this.setState({todos});
    // }

    render(){
        return(
            <div>
                <button onClick={this.handleClear}>Clear</button>

                <AddTodo
                    value={this.props.todoText}
                    onChange={(event) => {this.props.changeTodo(event)}}
                    onSubmit={this.handleAdd}
                />

                <label style={{color: 'red'}}>{this.props.errorMessage}</label>

                <div>
                    {this.props.todos.map((todo, index) => {
                        return (
                            <TodoElement
                                key={index}
                                todo={todo}
                                checkedClick={() => this.handleChecked(index)}
                                removeClick={() => this.handleRemove(index)}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        todoText: state.todos.todoText,
        todos: state.todos.todos,
        // errorMessage: state.errorMessage
    }
}

export default connect(MapStateToProps)(Todo)