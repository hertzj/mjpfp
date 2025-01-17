import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Calendar from './newCal'
import Edit from './EditEvent';
import Create from './Create';
import store from './redux/store';


const root = document.getElementById('root');

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component = { Calendar } />
                    <Route path='/events/:id' component = { Edit } />
                    <Route path='/create' component={ Create } />
                </Switch>
            </HashRouter>
        )
    }
}

ReactDOM.render(<App />, root)