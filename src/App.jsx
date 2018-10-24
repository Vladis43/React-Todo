import React, {Component} from 'react';

class ToDo extends Component{
    state={
        toDoTitle: '',
        toDos: []
    }

    handleChange = (event) => {
        this.setState({
            toDoTitle: event.target.value
        })
        // console.log(this.state.toDoTitle)
    }

    handleClick = (event) => {
        event.preventDefault()

        this.setState({
            toDos: [...this.state.toDos, this.state.toDoTitle]
        })
        // console.log(this.state.toDos)
    }

    render(){
        return(
            <div>
                <form onSubmit={e => this.handleClick(e)}>
                    <input type="text" value={this.state.toDoTitle} onChange={e => this.handleChange(e)}/>
                    <button type="submit">enter</button>
                </form>
                <ul>
                    {this.state.toDos.map(function (elem, index) {
                        return <li key={`${elem} ${index}`}>{elem}</li>
                    })}
                </ul>
            </div>
        )
    }

}

class App extends Component{
    render(){
        return(
            <div>
                <ToDo />
            </div>
        )
    }
}

export default App