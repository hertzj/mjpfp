import { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class Edit extends Component {
    constructor(props) {
        super();
        this.state = {
            title: '',
        }
    }

    handleChange(ev) {
        const field = ev.target.name;
        this.setState({[field]: ev.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        const id = this.props.match.params.id
        console.log(id)
        const { title } = this.state;
        const date = document.querySelector('#date').value;
        console.log(date) 
        const newData = {
            title,
            date,
        }

        axios.put(`/api/events/${id}`, newData) // need to include payload
        
    }

    render() {
        // console.log(location)
        // console.log(this.props.match.params.id)
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <h4>Edit Event</h4>
                <input type="text" name='title' onChange={(e) => this.handleChange(e)}/>
                <input type="date" name="date" id='date'/>
                <button>Change!</button>
            </form>
        );
    }
}

export default Edit