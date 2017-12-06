import * as React from 'react';
import { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Students from './Students';

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>Attendnace Web</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/students">Students</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Dashboard}/>
                        <Route path="/students" component={Students}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;