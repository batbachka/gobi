import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import { Provider } from 'react-redux';
const rootElement = document.getElementById('wrap');
let createHistory = require("history").createBrowserHistory;
let history = createHistory();
import configureStore from './store';
/** @namespace window.__INITIAL_STATE__ */
let main = window.__INITIAL_STATE__;
const store = configureStore(main);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}/>
    </Provider>,
    rootElement
);