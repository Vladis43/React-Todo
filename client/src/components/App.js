import React, { Component } from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store  from 'store'

import TodoApp from './todoapp/TodoApp'
import Registration from './registration/Registration'
import Authorization from './authorization/Authorization'

class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={TodoApp}/>
                        <Route path='/auth' component={Authorization}/>
                        <Route path='/reg' component={Registration}/>
                        <Route render={() => <div>Error 404. This page is not found!</div>}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App