import React, {Component} from "react";
import ToDoElement from './ToDoElement'

class ToDo extends Component{
    state = {
        toDoTitle: '',
        toDos: [],
        errorMessage: ''
    };

    handleChange = (event) => {
        this.setState({
            toDoTitle: event.target.value
        })
    };

    handleAdd = (event) => {
        event.preventDefault();

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
    };

    handleRemove = (event, elem) => {
        event.preventDefault();

        const newToDos = this.state.toDos.filter((elems) => {
            return elems !== elem
        })

        this.setState({
            toDos: [...newToDos]
        })
    };

    handleClear = (event) => {
        event.preventDefault();

        this.setState({
            toDos: []
        })
    };

    render(){
        return(
            <div className="wrapper">
                <button onClick={event => this.handleClear(event)}>Clear</button>
                <form onSubmit={event => this.handleAdd(event)}>
                    <input type="text" value={this.state.toDoTitle} onChange={event => this.handleChange(event)}/>
                    <button type="submit">enter</button>
                </form>

                {/*Error message*/}
                <label style={{color: 'red'}}>{this.state.errorMessage}</label>

                <div className="outputList">
                    {this.state.toDos.map((elem, index) => {
                        return (
                            <div key={`${elem} ${index}`}>
                                <ToDoElement element={elem} />
                                <button onClick={event => this.handleRemove(event, elem)}>Remove</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ToDo