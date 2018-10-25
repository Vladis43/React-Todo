import React, {Component} from "react"
import ToDoElement from './ToDoElement'

class ToDo extends Component{
    state = {
        todoText: '',
        todos: [
            {
                text: 'Bread',
                onChecked: false
            },
            {
                text: 'Kolbasa',
                onChecked: false
            },
            {
                text: 'M`yaso',
                onChecked: false
            }
        ],
        errorMessage: ''
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
                errorMessage: 'Please enter the value!'
            })
        } else {
            this.setState({
                todos: [...this.state.todos, {text: this.state.todoText, onChecked: false}],
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
        const todos = this.state.todos.map((todoItem, indexItem) => index === indexItem ? {...todoItem, onChecked: !todoItem.onChecked} : todoItem)
        this.setState({todos});
    }


    render(){
        return(
            <div className="wrapper">
                <button onClick={event => this.handleClear(event)}>Clear</button>
                <form onSubmit={event => this.handleAdd(event)}>
                    <input type="text" value={this.state.todoText} onChange={this.handleChange}/>
                    <button type="submit">Add</button>
                </form>

                {/*Error message*/}
                <label style={{color: 'red'}}>{this.state.errorMessage}</label>

                <div className="outputList">
                    {this.state.todos.map((todo, index) => {
                        return (
                            <ToDoElement key={index} id={index} todo={todo} onCheckedClicked={() => this.handleChecked(index)} removeClick={() => this.handleRemove(index)} />
                        )
                    })}
                </div>
            </div>
        )
    }
}

//TODO styles

export default ToDo