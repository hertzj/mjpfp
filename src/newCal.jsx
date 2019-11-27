import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import store from './redux/store';


const months = moment.months()

class Calendar extends Component {
    constructor(){
        super();
        // this.state = {
        //     currentDate: moment(),
        //     currentDateInfo: moment().toArray(),
        //     currentMonth: moment().get('month'),
        //     daysInMonth: moment(moment()).daysInMonth(),
        //     selectedDate: new Date(),
        //     events: [{
        //         title: 'test',
        //         date: '2019-10-20',
        //     }],
        // };
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
        // console.log(this.state.events)
    }
    // componentWillUnmount() {
    //     this.unsubscribe()
    // }

    // componentDidUpdate() {
    //     this.renderDays();
    //     // this.fetchEvents();
    // }

    fetchEvents() {
        axios.get('/api/events')
        .then(response => {
            const events = response.data;
            // console.log(events)
            // this.setState({events}) // in reducer
            store.dispatch({
                type: 'newEvents',
                data: events,
            })
        })
        this.renderDays()
    }

    deleteEvent(e) {
        const id = e.target.parentNode.dataset.id; // might have to do dataset.id
        console.log('the deleted id is: ', id)
        axios.delete(`/api/events/${id}`);
        this.fetchEvents()
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
        // console.log('the current Month is: ', this.state.currentMonth);
        // console.log(`${shortMonth} has ${daysInMonth} days`)

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < cols; j++) {
                if (day > daysInMonth) break;
                if (j < firstDay && start === false) {
                    days.push(
                        <td key={Math.random()}></td> // might need some styling
                    )
                }
                else if (j === firstDay && start === false) {
                    start = true; // need to figure out month
                    days.push(
                        <td key={Math.random()} data-date={`${moment(this.state.currentDate).year()}-${this.state.currentMonth + 1}-${day}`}>
                            {shortMonth} { day } - { daysOfWeek[j] }
                        </td>
                    )
                    day++
                }
                else {
                    // const data = `${this.state.currentMonth}-${day}-${moment(this.state.currentDate).year()}`
                    const data = `${moment(this.state.currentDate).year()}-${this.state.currentMonth + 1}-${day > 10? day : '0' + day}`
                    const dayEvent = this.state.events.filter(event => event.date === data)[0];
                    days.push(
                        <td key={Math.random()} data-date={data} data-id={dayEvent ? dayEvent.id : ''}
                            className={dayEvent ? 'hasEvent' : ''}
                            // onClick={!dayEvent ? '' : () => {}}
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
        // console.log(nextMonth.toArray())
        // this.setState({ // in reducer
        //     currentDate: nextMonth,
        //     currentDateInfo: nextMonth.toArray(),
        //     currentMonth: moment(nextMonth).get('month'),
        //     daysInMonth: moment(nextMonth).daysInMonth(),
        // })
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
        // console.log('the store is: ', store.getState())
        // console.log('the component state is: ', this.state);
    }

    priorMonth(e) {
        e.preventDefault();
        const lastMonth = moment(this.state.currentDateInfo.slice(0, 2)).subtract(1, 'months');
        // console.log(moment(lastMonth).get('month'))
        // this.setState({ // use prior month in reducer
        //     currentDate: lastMonth,
        //     currentDateInfo: lastMonth.toArray(),
        //     currentMonth: moment(lastMonth).get('month'),
        //     daysInMonth: moment(lastMonth).daysInMonth(),
        // })
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
        // console.log('currentDateInfo from State: ', this.state.currentDateInfo);
        // console.log('currentDateInfo from State - sliced: ', this.state.currentDateInfo.slice(0, 2));
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