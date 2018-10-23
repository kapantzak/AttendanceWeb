import * as React from 'react';
import { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Students from './Students';
import QRCode from './QRCode';
import { Col, Button, Form, FormGroup, Input, Alert } from 'reactstrap';
import { BeatLoader } from 'react-spinners';
import * as ses from './Helpers/sessionHelper';
import * as api from './Helpers/apiHelper';
import * as Config from './config.dev';
import AttendanceLogs from './AttendanceLogs';

interface IMainProps {}

interface IMainState {
    username: string,
    password: string,
    userRoles: number[],
    userRolesObj: ses.IUserRoles,
    isLoggedIn: boolean,    
    invalidCredentials: boolean,
    loading: boolean,
    error: any
}

class Main extends Component<IMainProps,IMainState> {

    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userRoles: [],
            userRolesObj: {},
            isLoggedIn: ses.getAuthToken() !== null,
            invalidCredentials: false,
            loading: false,
            error: null
        }
        this.onBtnLoginClick = this.onBtnLoginClick.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.validateInputs = this.validateInputs.bind(this);
    }

    getToken(username: string, password: string) {

        let headers = api.getHeaders(api.ContentType.json, false);
        
        let body = {
            Username: username,
            Password: password
        };

        this.setState({
            loading: true
        })

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
                let invalid = text.replace(/\"/g, '') === "InvalidCredentials";
                let obj = JSON.parse(text);
                if (!invalid) {                    
                    ses.saveAuthTokenToSession(obj.token);
                    ses.saveUserIdToSession(obj.userId);
                    ses.saveUserRolesToSession(obj.userRoles);
                }       
                let sesUserRoles = ses.getUserRoles();         
                this.setState({
                    isLoggedIn: !invalid,
                    invalidCredentials: invalid,
                    userRoles: (sesUserRoles !== null) ? sesUserRoles : [],
                    userRolesObj: (sesUserRoles !== null) ? ses.getUserRolesObj() : {},
                    loading: false
                })                
            })
            .catch(error => this.setState({ error }));
        }        
    }

    onBtnLoginClick() {        
        this.getToken(this.state.username,this.state.password);
    }

    logout() {
        ses.deleteAuthToken();
        this.setState({
            username: '',
            password: '',
            isLoggedIn: false,
            invalidCredentials: false,
            loading: false
        });
    }

    changeUsername(e: any) {
        this.setState({
            username: e.target.value
        });
    }

    changePassword(e: any) {
        this.setState({
            password: e.target.value
        });
    }

    validateInputs() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    render() {

        const username = this.state.username;
        const isLoggedIn = this.state.isLoggedIn;
        const invalidCredentials = this.state.invalidCredentials;
        
        let loadingDiv = null;
        if (this.state.loading) {
            loadingDiv = <div id="loadingDiv">
                            <div id="innerLoading">
                                <BeatLoader
                                    color={'#333'}
                                    loading={this.state.loading}
                                />
                            </div>
                        </div>;
        }
        
        let alertDiv = (invalidCredentials === true) ? <Col sm={12} className="marginTop-md"><Alert color="danger">Invalid credentials</Alert></Col> : "";

        if (isLoggedIn !== true) {
            return (                
                <div id="mainLoginFormHolder">
                    {loadingDiv}
                    <Form id="mainLoginForm">
                        <FormGroup row>
                            <Col className="text-center" sm={12}>
                                <h2 className="site-title"><em className="fa fa-check-circle"></em> Attendance Web</h2>
                            </Col>
                        </FormGroup>
                        <FormGroup row>                        
                            <Col sm={12}>
                                <Input type="text" name="username" id="username" placeholder="Username" onChange={this.changeUsername} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>                        
                            <Col sm={12}>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.changePassword} />
                            </Col>
                            {alertDiv}
                        </FormGroup>                        
                        <FormGroup check row>
                            <Col className="text-center" sm={12}>
                                <Button color="default" 
                                    disabled={!this.validateInputs()}
                                    onClick={(e: any) => { 
                                        e.preventDefault();
                                        this.onBtnLoginClick();
                                    }}>Login</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>                
            )
        }

        // Logged user
        return (            
            <HashRouter>
                <div className="container-fluid">
                    <div className="row">

                        {loadingDiv}

                        <nav className="sidebar col-xs-12 col-sm-4 col-lg-3 col-xl-2 bg-faded sidebar-style-1">
                            <h1 className="site-title"><a href="index.html"><em className="fa fa-check-circle"></em> Attendance Web</a></h1>
                            
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
                                        <span>{username}</span>
                                        <span className="marginLeft-md"><i className="fa fa-user-circle fa-lg"></i></span>
                                        <Button color="default" onClick={() => this.logout()} className="marginLeft-md">Logout</Button>
                                    </span>
                                </div>                                
                            </header>

                            <section className="row">
                                <div className="col-sm-12">
                                    <Route exact path="/" component={Dashboard}/>
                                    <Route path="/students" component={Students}/>
                                    <Route path="/qrcode" component={QRCode}/>
                                    <Route path="/attendanceLogs/:courseAssigmentId" component={AttendanceLogs}/>
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