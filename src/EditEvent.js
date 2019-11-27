import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import store from './redux/store';

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

    async handleSubmit(e) {
        e.preventDefault()
        const id = Number(this.props.match.params.id);
        // console.log(id)
        const { title } = this.state;
        const date = document.querySelector('#date').value;
        // console.log(date) 
        const newData = {
            id,
            title,
            date,
        }
        await axios.put(`/api/events/${id}`, newData)
        store.dispatch({
            type: 'editEvent',
            data: newData,
            id: id,
        })

        
        this.props.history.push('/')
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