import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import moment from "moment";

const now = moment()
const NEW_EVENTS = 'newEvents';
const MONTH_CHANGE = 'monthChange';
const EDIT_EVENT = 'editEvent';


const initialState = {
    currentDate: moment(),
    currentDateInfo: moment().toArray(),
    currentMonth: moment().get('month'),
    daysInMonth: moment(now).daysInMonth(),
    // selectedDate
    events: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case NEW_EVENTS:
            // eslint-disable-next-line no-case-declarations
            let newEvents = {
                ...state,
                events: [...state.events, action.data],
            }
            return newEvents;
        case MONTH_CHANGE:
            // eslint-disable-next-line no-case-declarations
            let nextMonth = {
                ...state,
                currentDate: action.date,
                currentDateInfo: action.dateInfo,
                currentMonth: action.month,
                daysInMonth: action.daysInMonth
            }
            return nextMonth
        case EDIT_EVENT:
            // eslint-disable-next-line no-case-declarations
            let id = action.id;
            let events = state.events.filter(event => event.id !== id);
            events.push(action.data)
            // eslint-disable-next-line no-case-declarations
            let newState = {
                ...state,
                events,
            }
            return newState;
        default:
            return state
    }

}


const store = createStore(reducer, applyMiddleware(logger));

export default store;