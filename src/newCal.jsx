import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import store from './redux/store';


const months = moment.months()

class Calendar extends Component {
    constructor(props){
        super();
        this.state = store.getState();
        this.renderDays = this.renderDays.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.priorMonth = this.priorMonth.bind(this);
        this.fetchEvents = this.fetchEvents.bind(this);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
        this.renderDays();
        this.fetchEvents();
    }
    componentWillUnmount() {
        this.unsubscribe()
    }

    async fetchEvents() {
        await axios.get('/api/events')
        .then(response => {
            const events = response.data;
            console.log('events from fetchEvents', events)
            store.dispatch({
                type: 'newEvents',
                data: events,
            })
        })
        this.renderDays()
    }


    deleteEvent(e) {
        let id = e.target.parentNode.dataset.id;
        axios.delete(`/api/events/${id}`);
        store.dispatch({
            type: 'deleteEvent',
            id,
        })
    }

    // eslint-disable-next-line complexity
    renderDays(){
        let { daysInMonth } = this.state;
        let firstDay = moment(this.state.currentDateInfo.slice(0, 2)).day() // 0 is Sunday
        let cols = 7;
        let numRows = Math.ceil(daysInMonth / cols);
        let days = [];
        let rows = [];
        let start = false;
        const daysOfWeek = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');
        let day = 1;
        let shortMonth = moment.monthsShort()[this.state.currentMonth];

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < cols; j++) {
                if (day > daysInMonth) break;
                if (j < firstDay && start === false) {
                    days.push(
                        <td key={Math.random()}></td>
                    )
                }
                else if (j === firstDay && start === false) {
                    start = true;
                    const data = `${moment(this.state.currentDate).year()}-${this.state.currentMonth + 1}-${day > 10? day : '0' + day}`
                    const dayEvent = this.state.events.filter(event => event.date === data)[0];
                    days.push(
                        <td key={Math.random()} data-date={data} data-id={dayEvent ? dayEvent.id : ''}
                        className={dayEvent ? 'hasEvent' : ''}
                    >
                        {shortMonth} { day } - { daysOfWeek[j] }
                        {
                            !dayEvent ? '' :
                            <span>{dayEvent.title}</span>
                        }
                        {!dayEvent ? '' : 
                            <Link to={`/events/${dayEvent.id}`}>Edit me!</Link>
                        }
                        {!dayEvent ? '' :
                            <button onClick={(e) => this.deleteEvent(e)}>Delete</button>
                        }
                    </td>
                    )
                    day++
                }
                else {
                    const data = `${moment(this.state.currentDate).year()}-${this.state.currentMonth + 1}-${day > 10? day : '0' + day}`
                    const dayEvent = this.state.events.filter(event => event.date === data)[0];
                    days.push(
                        <td key={Math.random()} data-date={data} data-id={dayEvent ? dayEvent.id : ''}
                            className={dayEvent ? 'hasEvent' : ''}
                        >
                            {shortMonth} { day } - { daysOfWeek[j] }
                            {
                                !dayEvent ? '' :
                                <span>{dayEvent.title}</span>
                            }
                            {!dayEvent ? '' : 
                                <Link to={`/events/${dayEvent.id}`}>Edit me!</Link>
                            }
                            {!dayEvent ? '' :
                                <button onClick={(e) => this.deleteEvent(e)}>Delete</button>
                            }
                        </td>
                    )
                    day++
                }
            }
            rows.push(
                <tr key={Math.random()}>
                    {days}
                </tr>
            )
            days = [];
        }
        start = false;
        day = 1;
        return rows;
    }


    nextMonth(e) {
        e.preventDefault()
        const nextMonth = moment(this.state.currentDateInfo.slice(0, 2)).add(1, 'months');
        const date = nextMonth;
        const dateInfo = nextMonth.toArray();
        const month = moment(nextMonth).get('month');
        const daysInMonth = moment(nextMonth).daysInMonth();
        store.dispatch({
            type: 'monthChange',
            date,
            dateInfo,
            month,
            daysInMonth,

        })
    }

    priorMonth(e) {
        e.preventDefault();
        const lastMonth = moment(this.state.currentDateInfo.slice(0, 2)).subtract(1, 'months');
        store.dispatch({
            type: 'monthChange',
            date: lastMonth,
            dateInfo: lastMonth.toArray(),
            month: moment(lastMonth).get('month'),
            daysInMonth: moment(lastMonth).daysInMonth(),

        })
    }

    render() {
        const daysOfWeek = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');
        return (
            <div>
                <button onClick={(e) => this.priorMonth(e)}>Prior Month</button>
                <table>
                    <thead key={Math.random()}>
                        <tr key={Math.random()}>
                            { daysOfWeek.map(day => <th>{day}</th>) }
                        </tr>
                    </thead>
                    <tbody key={Math.random()}>
                        {this.renderDays()}
                    </tbody>
                </table>
                <button onClick={(e) => this.nextMonth(e)}>Next Month</button>
            </div>

        )
    }
    
}

export default Calendar