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

    handleClick = (event) => {
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

    render(){
        return(
            <div className="wrapper">
                <form onSubmit={e => this.handleClick(e)}>
                    <input type="text" value={this.state.toDoTitle} onChange={e => this.handleChange(e)}/>
                    <button type="submit">enter</button>
                </form>

                {/*Error message*/}
                <label style={{color: 'red'}}>{this.state.errorMessage}</label>

                <div className="outputList">
                    {this.state.toDos.map(function (elem, index) {
                        return <ToDoElement key={`${elem} ${index}`} element={elem} />
                    })}
                </div>
            </div>
        )
    }
}

export default ToDo