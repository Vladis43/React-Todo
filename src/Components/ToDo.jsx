import React, {Component} from "react"
import ToDoElement from './ToDoElement'

class ToDo extends Component{
    state = {
        toDoTitle: '',
        toDos: [],
        errorMessage: ''
    }

    handleChange = (event) => {
        this.setState({
            toDoTitle: event.target.value
        })
    }

    handleAdd = (event) => {
        event.preventDefault()

        if(this.state.toDoTitle === ''){
            this.setState({
                errorMessage: 'Please enter the value!'
            })
        } else {
            this.setState({
                toDos: [...this.state.toDos, this.state.toDoTitle],
                errorMessage: ''
            })
        }
    }

    handleRemove = (todo) => {
        const newToDos = this.state.toDos.filter((elems) => {
            return elems !== todo
        })

        this.setState({
            toDos: newToDos
        })
    }

    handleClear = () => {
        this.setState({
            toDos: []
        })
    }

    render(){
        return(
            <div className="wrapper">
                <button onClick={event => this.handleClear(event)}>Clear</button>
                <form onSubmit={event => this.handleAdd(event)}>
                    <input type="text" value={this.state.toDoTitle} onChange={this.handleChange}/>
                    <button type="submit">enter</button>
                </form>

                {/*Error message*/}
                <label style={{color: 'red'}}>{this.state.errorMessage}</label>

                <div className="outputList">
                    {this.state.toDos.map((todo, index) => {
                        return (
                            <div key={index}>
                                <ToDoElement element={todo} />
                                <button onClick={event => this.handleRemove(todo)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

//TODO styles

export default ToDo