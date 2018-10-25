import React, {Component} from "react"

class ToDoElement extends Component{
    render(){
        return(
            <div>
                <div>{this.props.element}</div>
                <button onClick={this.props.removeClick}>Remove</button>
            </div>
        )
    }
}


export default ToDoElement