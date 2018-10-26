import React, {Component} from 'react'
import AddTodo from './AddTodo'
import TodoElement from './TodoElement'


class Todo extends Component{
    state = {
        todoText: '',
        todos: [],
        errorMessage: ''
    }

    componentDidUpdate() {
        localStorage.setItem('todos', JSON.stringify(this.state.todos))
    }

    componentDidMount() {
        if(localStorage.todos){
            this.setState({
                todos: JSON.parse(localStorage.getItem('todos'))
            })
        }
    }


    handleChange = (event) => {
        this.setState({
            todoText: event.target.value
        })
    }

    handleAdd = (event) => {
        event.preventDefault()

        if(this.state.todoText === ''){
            this.setState({
                errorMessage: 'Text field is required!'
            })
        } else {
            this.setState({
                todos: [...this.state.todos, {text: this.state.todoText, completed: false}],
                errorMessage: '',
                todoText: ''
            })
        }
    }

    handleRemove = (index) => {
        this.setState({
            todos: this.state.todos.filter((callback, indexItem) => indexItem !== index)
        })
    }

    handleClear = () => {
        this.setState({
            todos: []
        })
    }

    handleChecked = (index) => {
        const todos = this.state.todos.map((todoItem, indexItem) => index === indexItem ? {...todoItem, completed: !todoItem.completed} : todoItem)
        this.setState({todos});
    }

    render(){
        return(
            <div>
                <button onClick={this.handleClear}>Clear</button>

                <AddTodo value={this.state.todoText} onChange={this.handleChange} onSubmit={this.handleAdd}/>

                <label style={{color: 'red'}}>{this.state.errorMessage}</label>

                <div>
                    {this.state.todos.map((todo, index) => {
                        return (
                            <TodoElement key={index} todo={todo} checkedClick={() => this.handleChecked(index)} removeClick={() => this.handleRemove(index)} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Todo