import React from 'react';
import {Provider} from 'react-redux';
import {Dashboard} from './Dashboard';
import {Router,Route} from 'react-router-dom';
import {history} from '../store/history';
import {Users} from './Users';
import {FileHandle}from './FileHandle';
import {Studentdata} from './Studentdata';
import {Filter} from './Filter';
import {Total}from './Total';
import {Usermanual} from './Usermanual';
export const Main=()=>(
    <Router history={history}>
    
    
        <div>
        <Route
        exact path="/"
        component={Users}></Route>
        <Route
        exact path="/dashboard"
        component={Dashboard}>
        </Route>
        <Route
        exact path="/filehandle"
        component={FileHandle}>
        </Route>
        <Route
        exact path="/studentdata"
        component={Studentdata}>
        </Route>
        <Route
        exact path="/filter"
        component={Filter}>
        </Route>
        <Route
        exact path="/total"
        component={Total}>
        </Route>
        <Route
        exact path="/usermanual"
        component={Usermanual}>
        </Route>
            </div>
    </Router>
)