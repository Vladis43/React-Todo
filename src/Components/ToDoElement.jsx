import React, {Component} from "react"

class ToDoElement extends Component{
    // state = {
    //   isActive: true
    // };
    //
    // handleClick = () => {
    //     this.setState({
    //         isActive: !this.state.isActive
    //     })
    // };

    render(){
        return(
            <div>
                <div>{this.props.element}</div>
                {/*<div>{this.state.isActive ? '' : <label>&#10003; Checked</label>}</div>*/}
            </div>
        )
    }
}


export default ToDoElement