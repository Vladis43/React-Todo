import React, { Component } from 'react'

//Redux
import { Provider } from 'react-redux'
import store  from 'store'

//Component
import TodoApp from './TodoApp'

class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <TodoApp />
            </Provider>
        )
    }
}

export default App