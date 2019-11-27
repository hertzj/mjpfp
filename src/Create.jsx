import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import store from './redux/store';

class Create extends Component {
    constructor(props) {
        super();
    }

    handleSubmit(e) {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const date = document.querySelector('#date').value;

        store.dispatch({
            type: 'newEvents',
            data: {title, date},
        })

        axios.post('/api/events', {title, date})
        const inputs = [...document.querySelectorAll('input')];
        inputs.forEach(input => {
            input.value = '';
        })
        this.props.history.push('/')
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <h4>Add an Event!</h4>
                <input type="text" name='title' id='title'/>
                <input type="date" name="date" id="date"/>
                <button>Create!</button>
            </form>
        )
    }
}

export default Create;