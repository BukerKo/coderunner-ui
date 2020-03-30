import React from 'react';

import StudentContent from "./Student/StudentContent/StudentContent";
import {Redirect, Route, withRouter} from "react-router-dom";
import {Switch} from "react-bootstrap";
import Login from "./Login/Login";
import ReactLoading from "react-loading";
import LoadingOverlay from "react-loading-overlay";

import {
  ACCESS_TOKEN,
  CURRENT_PROVIDER,
  CURRENT_ROLE,
  CURRENT_USERNAME,
  FACEBOOK_APP_ID,
  FACEBOOK_PROVIDER,
  INITIAL_CODE, ROLE_ADMIN,
  ROLE_USER,
  SOURCECODE_KEY
} from "./constants";
import * as Cookies from "js-cookie";

import Signup from "./Signup/Signup";
import Toolbar from "./Toolbar/Toolbar";
import Admin from "./Admin/Admin";
import Container from "react-bootstrap/Container";

class App extends React.Component {

  state = {
    isLoading: false,
  };

  componentDidMount() {
    window.FB.init({
      appId: FACEBOOK_APP_ID,
      status: true,
      xfbml: true,
      version: 'v2.7' // or v2.6, v2.5, v2.4, v2.3
    });
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const role = params.get("role");
    const username = params.get("username");
    const provider = params.get("provider");
    if (token && role && username && provider) {
      this.handleLogin(token, role, username, provider);
    }
  }

  isLoggedIn = () => {
    return !!Cookies.get(ACCESS_TOKEN)
  };

  isAdmin = () => {
    return Cookies.get(CURRENT_ROLE) === ROLE_ADMIN;
  };

  setLoading = (loading) => {
    this.setState({isLoading: loading});
  };

  handleLogout = () => {
    if (Cookies.get(CURRENT_PROVIDER) === FACEBOOK_PROVIDER) {
      window.FB.logout(() => {
        this.logout();
      });
    } else {
      this.logout();
    }
  };

  logout = () => {
    const cookies = Cookies.getJSON();
    for (let prop in cookies) {
      if (Object.prototype.hasOwnProperty.call(cookies, prop)) {
        Cookies.remove(prop);
      }
    }
    this.props.history.push("/");
  };

  handleLogin = (accessToken, role, username, provider) => {
    Cookies.set(ACCESS_TOKEN, accessToken);
    Cookies.set(CURRENT_ROLE, role);
    Cookies.set(CURRENT_USERNAME, username);
    Cookies.set(CURRENT_PROVIDER, provider);
    localStorage.setItem(SOURCECODE_KEY, INITIAL_CODE);
    if (role === ROLE_USER) {
      this.props.history.push('/student');
    }
    if (role === ROLE_ADMIN) {
      this.props.history.push('/admin');
    }
  };

  render() {
    return (
        <LoadingOverlay
            styles={{
              overlay: (base) => ({
                ...base,
                background: "rgba(0, 0, 0, 0)"
              })
            }}
            active={this.state.isLoading}
            spinner={
              <div className="loader">
                <ReactLoading type={"spin"} color={"black"}/>
              </div>
            }
        >
          <Toolbar username={Cookies.get(CURRENT_USERNAME)}
                   handleLogout={this.handleLogout}/>
          <Container>
            <div className="app">
              <Switch>
                <Route exact path={["/login", "/"]}>
                  <Login handleLogin={this.handleLogin}
                         isLoggedIn={this.isLoggedIn}
                         isAdmin={this.isAdmin}
                         setLoading={this.setLoading}/>
                </Route>
                <Route exact path="/signup" component={Signup}>
                  <Signup handleLogin={this.handleLogin}
                          setLoading={this.setLoading}/>
                </Route>
                <Route exact path="/student" render={() => (
                    this.isLoggedIn() ? (
                        <StudentContent handleLogout={this.handleLogout}
                                        setLoading={this.setLoading}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                )}/>
                <Route exact path="/admin" render={() => (
                    this.isLoggedIn() && this.isAdmin() ? (
                        <Admin setLoading={this.setLoading}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                )}/>
              </Switch>
            </div>
          </Container>
        </LoadingOverlay>
    );
  }
}

export default withRouter(App);