import {Component} from "react";
import React from "react";

class ToDoElement extends Component{
    render(){
        return(
            <div>{this.props.element}</div>
        )
    }
}

export default ToDoElement