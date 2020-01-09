import React from 'react';

import StudentContent from "./Student/StudentContent/StudentContent";
import {Redirect, Route, withRouter} from "react-router-dom";
import {Switch} from "react-bootstrap";
import Login from "./Login/Login";
import {ACCESS_TOKEN, CURRENT_ROLE, CURRENT_USERNAME, ROLE_USER} from "./constants";
import * as Cookies from "js-cookie";

import Signup from "./Signup/Signup";
import Toolbar from "./Toolbar/Toolbar";


class App extends React.Component {

    isLoggedIn = () => {
        return !!Cookies.get(ACCESS_TOKEN)
    };

    handleLogout = () => {
        const cookies = Cookies.getJSON();
        for (let prop in cookies) {
            if (Object.prototype.hasOwnProperty.call(cookies, prop)) {
                Cookies.remove(prop);
            }
        }
        this.props.history.push("/");
    };

    handleLogin = (accessToken, role, username) => {
        Cookies.set(ACCESS_TOKEN, accessToken);
        Cookies.set(CURRENT_ROLE, role);
        Cookies.set(CURRENT_USERNAME, username);
        if (role === ROLE_USER) {
            this.props.history.push('/student');
        }
    };

    render() {
        return (
            <div className="app">
                <Toolbar username={Cookies.get(CURRENT_USERNAME)} handleLogout={this.handleLogout} />
                <Switch>
                        <Route exact path={["/login", "/"]} >
                            <Login handleLogin={this.handleLogin} />
                        </Route>
                        <Route exact path="/signup" component={Signup} >
                            <Signup handleLogin={this.handleLogin}/>
                        </Route>
                        <Route exact path="/student" render={() => (
                            this.isLoggedIn() ? (
                                <StudentContent handleLogout={this.handleLogout}/>
                            ) : (
                                <Redirect to="/login"/>
                            )
                        )}/>
                    </Switch>
            </div>
        );
    }
}

export default withRouter(App);