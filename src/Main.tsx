import * as React from 'react';
import { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Students from './Students';
// import { Button } from 'reactstrap';

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div className="container-fluid">
                    <div className="row">

                        <nav className="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2 bg-faded sidebar-style-1">
                            <h1 className="site-title"><a href="index.html"><em className="fa fa-rocket"></em> Attendance Web</a></h1>
                            
                            <ul className="nav nav-pills flex-column sidebar-nav">
                                <li className="nav-item"><NavLink exact to="/"><i className="fa fa-dashboard"></i> Dashboard</NavLink></li>
                                <li className="nav-item"><NavLink to="/students"><i className="fa fa-chevron-right"></i> Students</NavLink></li>                                
                            </ul>                            
                        </nav>

                        <main className="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">

                            <header className="page-header row justify-center">
                                <div className="col-sm-12">                                    
                                    test
                                </div>                                
                            </header>

                            <section className="row">
                                <div className="col-sm-12">
                                    <Route exact path="/" component={Dashboard}/>
                                    <Route path="/students" component={Students}/>
                                </div>                                
                            </section>

                        </main>

                    </div>

                </div>
            </HashRouter>
        );
    }
}

export default Main;