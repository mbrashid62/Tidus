import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import Dashboard from'./components/main/Dashboard';
import AboutPage from './components/about/AboutPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="callback" component={Dashboard} />
        <Route path="about" component={AboutPage} />
        <Route path="*" component={HomePage} />
    </Route>
);