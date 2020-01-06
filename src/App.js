import React from 'react';

import StudentContent from "./Student/StudentContent/StudentContent";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {Switch} from "react-bootstrap";
import LoginComponent from "./Login/Login";
import {CURRENT_USERNAME} from "./constants";
import * as Cookies from "js-cookie";


export default class App extends React.Component {

    isLoggedIn = () => {
        return !!Cookies.get(CURRENT_USERNAME)
    };

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={LoginComponent} />
                        <Route exact path="/login" component={LoginComponent} />
                        <Route exact path="/student" render={() => (
                            this.isLoggedIn() ? (
                                <StudentContent/>
                            ) : (
                                <Redirect to="/login"/>
                            )
                        )}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
