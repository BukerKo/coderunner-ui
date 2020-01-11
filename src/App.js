import React from 'react';

import StudentContent from "./Student/StudentContent/StudentContent";
import {Redirect, Route, withRouter} from "react-router-dom";
import {Switch} from "react-bootstrap";
import Login from "./Login/Login";
import {
    ACCESS_TOKEN,
    CURRENT_ROLE,
    CURRENT_USERNAME, FACEBOOK_APP_ID,
    INITIAL_CODE,
    ROLE_USER,
    SOURCECODE_KEY
} from "./constants";
import * as Cookies from "js-cookie";

import Signup from "./Signup/Signup";
import Toolbar from "./Toolbar/Toolbar";


class App extends React.Component {

    componentDidMount() {
        window.FB.init({
            appId      : '848358615623604',
            status     : true,
            xfbml      : true,
            version    : 'v2.7' // or v2.6, v2.5, v2.4, v2.3
        });
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const role = params.get("role");
        const username = params.get("username");
         if (token && role && username) {
            this.handleLogin(token, role, username);
        }
    }

    isLoggedIn = () => {
        return !!Cookies.get(ACCESS_TOKEN)
    };

    handleLogout = () => {
            Cookies.remove(ACCESS_TOKEN);
            Cookies.remove(CURRENT_ROLE);
            Cookies.remove(CURRENT_USERNAME);
            Cookies.remove("c_user");
        this.props.history.push("/");
    };

    handleLogin = (accessToken, role, username) => {
        Cookies.set(ACCESS_TOKEN, accessToken);
        Cookies.set(CURRENT_ROLE, role);
        Cookies.set(CURRENT_USERNAME, username);
        localStorage.setItem(SOURCECODE_KEY, INITIAL_CODE);
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
                            <Login handleLogin={this.handleLogin} isLoggedIn={this.isLoggedIn}/>
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