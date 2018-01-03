import * as React from 'react';
import { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Students from './Students';
import QRCode from './QRCode';
import { Button } from 'reactstrap';
import * as ses from './Helpers/sessionHelper';
import * as api from './Helpers/apiHelper';
import * as Config from './config.dev';

interface IMainProps {}

interface IMainState {
    isLoggedIn: boolean,    
    error: any
}

class Main extends Component<IMainProps,IMainState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isLoggedIn: ses.getAuthToken() !== null,            
            error: null
        }
        this.onBtnLoginClick = this.onBtnLoginClick.bind(this);
    }

    getToken(username: string, password: string) {

        let headers = api.getHeaders(api.ContentType.json, false);
        
        let body = {
            Username: username,
            Password: password
        };

        if (headers !== null) {
            fetch(`${Config.serverUrl}api/Token`, {
                method: "post",
                headers: headers,
                body: JSON.stringify(body)
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error("Something went wrong...");
                }
            })
            .then(text => {                
                ses.saveAuthTokenToSession(text.replace(/\"/g, ''));    
                this.setState({
                    isLoggedIn: true
                })
            })
            .catch(error => this.setState({ error }));
        }        
    }

    onBtnLoginClick() {
        this.getToken("test","test");
    }

    logout() {
        ses.deleteAuthToken();
        this.setState({
            isLoggedIn: false
        });
    }

    render() {

        const { isLoggedIn } = this.state;
        
        if (isLoggedIn !== true) {
            return (
                <div><Button color="success" onClick={() => this.onBtnLoginClick()}>Login</Button></div>
            )
        }

        // Logged user
        return (
            <HashRouter>
                <div className="container-fluid">
                    <div className="row">

                        <nav className="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2 bg-faded sidebar-style-1">
                            <h1 className="site-title"><a href="index.html"><em className="fa fa-rocket"></em> Attendance Web</a></h1>
                            
                            <ul className="nav nav-pills flex-column sidebar-nav">
                                <li className="nav-item"><NavLink exact to="/"><i className="fa fa-dashboard"></i> Dashboard</NavLink></li>
                                <li className="nav-item"><NavLink to="/students"><i className="fa fa-graduation-cap"></i> Students</NavLink></li>
                                <li className="nav-item"><NavLink to="/qrcode"><i className="fa fa-qrcode"></i> QR Code</NavLink></li>
                            </ul>                            
                        </nav>

                        <main className="col-xs-12 col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">

                            <header className="page-header row justify-center">
                                <div className="col-sm-12">                                    
                                    <span className="pull-right">                                        
                                        <span>user@example.com</span>
                                        <span className="marginLeft-md"><i className="fa fa-user-circle fa-lg"></i></span>

                                        <Button color="default" onClick={() => this.logout()}>Logout</Button>

                                    </span>
                                </div>                                
                            </header>

                            <section className="row">
                                <div className="col-sm-12">
                                    <Route exact path="/" component={Dashboard}/>
                                    <Route path="/students" component={Students}/>
                                    <Route path="/qrcode" component={QRCode}/>
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