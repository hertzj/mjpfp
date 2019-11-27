import { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';


const months = moment.months()




class Calendar extends Component {
    constructor(){
        super();
        this.state = {
            currentDateInfo: moment().toArray(),
            currentMonth: moment().get('month'),
            selectedDate: new Date(),
            events: [],
        }
    }

    componentDidMount() {
        this.renderDays();
    }

    componentDidUpdate() {
        this.renderDays();
    }

    renderDays = () => {
        let daysInMonth = moment().daysInMonth(this.state.currentMonth);
        let firstDay = moment(this.state.currentDateInfo.slice(0, 2)).day() // 0 is Sunday
        let cols = 7;
        let numRows = Math.ceil(daysInMonth / cols);
        let days = [];
        let rows = [];
        let start = false;
        const daysOfWeek = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');
        let day = 1;
        let shortMonth = moment.monthsShort()[this.state.currentMonth]

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < cols; j++) {
                if (j < firstDay && start === false) {
                    days.push(
                        <td></td> // might need some styling
                    )
                }
                else if (j === firstDay && start === false) {
                    start = true; // need to figure out month
                    days.push(
                        <td>
                            {shortMonth} { day } - { daysOfWeek[j] }
                        </td>
                    )
                    day++
                }
                else {
                    days.push(
                        <td>
                            {shortMonth} { day } - { daysOfWeek[j] }
                        </td>
                    )
                    day++
                }
            }
            rows.push(
                <tr>
                    {days}
                </tr>
            )
            days = [];
        }
        start = false;
        day = 1;
        return rows; // this should just return the rows. I will need to put them in a table
        // and have table headers
    }

    nextMonth = () => {
        const nextMonth = moment(this.state.currentDateInfo.slice(0, 2)).add(1, 'months');
        this.setState({
            currentDateInfo: nextMonth
        })
    }

    priorMonth = () => {
        const lastMonth = moment(this.state.currentDateInfo.slice(0, 2)).subtract(1, 'months');
        this.setState({
            currentDateInfo: lastMonth
        })   
    }

    render() {
        const daysOfWeek = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');
        return (
            <table>
                <thead>
                    <tr>
                        { daysOfWeek.map(day => <th>{day}</th>) }
                    </tr>
                </thead>
                <tbody>
                    {this.renderDays()}
                </tbody>
            </table>
        )
    }
    
}

export default Calendar