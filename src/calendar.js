import { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import dateFns from 'date-fns';
import moment from 'moment'

const months = moment.months()


class Calendar extends Component {
    constructor(){
        super();
        this.state = { // will need to move to Redux
            currentMonth: new Date(),
            selectedDate: new Date(),
            events: [],
        }
        this.onDateClick = this.onDateClick.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this)
    }

    onDateClick(day) {

    }

    nextMonth() {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        })
    }

    prevMonth() {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        })
    }

    render() {
        return (
            <div className='calendar'>
                <div className='header'>
                    <div onClick={this.prevMonth}>
                        Previous Month
                    </div>
                </div>
                <div className='col col-center'>
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div onClick={this.nextMonth}>
                    Next Month
                </div>
                <div>
                    {
                        
                    }
                </div>
                <div>Cells</div>
            </div>
        )
    }
    
}

export default Calendar