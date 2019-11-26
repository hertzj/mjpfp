import { createStore } from 'redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM, { HashRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// initial state and reducer

const months = 'januaryfebruarymarchaprilmayjunejulyaugustseptemberoctobernovemberdecember'.split('');

const root = document.getElementById('root');