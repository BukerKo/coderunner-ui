import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import './Login.css'
import {login} from "../Service/RestService";
import fbLogo from "../img/fb-logo.png"
import {FACEBOOK_AUTH_URL} from "../constants";


class Login extends React.Component {

    state = {
        usernameOrEmail: "",
        password: "",
    };

    componentDidMount() {
        if (this.props.isLoggedIn()) {
            if(this.props.isAdmin) {
                this.props.history.push("/admin");
            }
            else {
                this.props.history.push("/student");
            }
        }
        if (this.props.location.search.includes('confirmed=true')) {
            alert('Successfully confirmed! Please login');
        }
        if (this.props.location.search.includes('verifyEmail=true')) {
            alert('Successfully signed up, please verify email by opening link in your mailbox!');
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const {id, value} = event.currentTarget;
        this.setState({[id]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {usernameOrEmail, password} = this.state;

        if (!usernameOrEmail || !password) {
            alert('Username and password should not be empty');
            return;
        }
        this.props.setLoading(true);
        login({usernameOrEmail: usernameOrEmail, password: password})
            .then(response => {
                this.props.setLoading(false);
                const {accessToken, role, username, provider} = response;
                this.props.handleLogin(accessToken, role, username, provider);
            }).catch(error => {
            this.props.setLoading(false);
            if (error.status === 401) {
                alert('Your Email or Password is incorrect. Please try again!');
            } else {
                alert(error.message || 'Sorry! Something went wrong. Please try again!')
            }
        });
    };

    render() {
        return (
            <div className="login">
                <h1 className="login-title">Login</h1>
                <SocialLogin/>
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <Form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
                    <Form.Group controlId="usernameOrEmail">
                        <Form.Control type="usernameOrEmail" placeholder="Email" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>
                    <Button className="login-button" variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
            </div>
        );
    }
}

class SocialLogin extends React.Component {
    render() {
        return (
            <div className="social-login">
                <a className="btn-social btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook"/>Log in with Facebook</a>
            </div>
        );
    }
}

export default withRouter(Login)