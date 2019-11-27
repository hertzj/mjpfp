import { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import dateFNS from 'date-fns';
import Calendar from './newCal'


// initial state and reducer


const root = document.getElementById('root');

ReactDOM.render(<Calendar />, root)
