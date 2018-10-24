import {Component} from "react";
import React from "react";

class ToDoElement extends Component{
    state = {
      isActive: true
    };

    handleClick = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    };

    render(){
        return(
            <div>
                <div className="ToDoElement" onClick={event => this.handleClick(event)}>{this.props.element}</div>
                <div>{this.state.isActive ? '' : <button>Close</button>}</div>
            </div>
        )
    }
}
//TODO remove element onClick={event => this.removeElement(event)}

export default ToDoElement