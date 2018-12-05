import React, {Component} from 'react'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from 'store'

import Card from '../containers/Card'
import Registration from '../containers/Registration'
import Authorization from '../containers/Authorization'
import Verification from '../containers/Verification'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Card}/>
                        <Route path='/authorization' component={Authorization}/>
                        <Route path='/registration' component={Registration}/>
                        <Route path='/verification' component={Verification}/>
                        <Route render={() => <div>Error 404. This page is not found!</div>}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App