import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import './Login.css';
import {login} from "../Service/RestService";
import fbLogo from "../img/fb-logo.png";
import ghLogo from "../img/gh-logo.png";
import googleLogo from "../img/google-logo.png";
import {
    FACEBOOK_AUTH_URL,
    GITHUB_AUTH_URL,
    GOOGLE_AUTH_URL
} from "../constants";


class Login extends React.Component {

    state = {
        usernameOrEmail: "",
        password: "",
    };

    componentDidMount() {
        if (this.props.isLoggedIn()) {
            this.props.history.push("/editor");
        }
        if (this.props.location.search.includes('confirmed=true')) {
            alert('Successfully confirmed! Please login');
        }
        if (this.props.location.search.includes('verifyEmail=true')) {
            alert('Successfully signed up, please verify email by opening link in your mailbox!');
        }
        const params = new URLSearchParams(window.location.search);
        const error = params.get("error");
        if(error) {
            alert(error);
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
            alert('Email and password should not be empty');
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
            <div className="form">
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
                    <Button className="login-button" variant="secondary" type="submit">
                        Login
                    </Button>
                </Form>
                <span className="signup-link"><Link to="/restore">Restore password</Link></span>
                <br/>
                <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
            </div>
        );
    }
}

class SocialLogin extends React.Component {
    render() {
        return (
            <div className="social-login">
                <a className="btn-social btn-block social-btn" href={FACEBOOK_AUTH_URL}>
                    <img className="social-image" src={fbLogo} alt="Facebook"/>
                    <div className="social-text">Log in with Facebook</div>
                </a>
                <a className="btn-social btn-block social-btn" href={GITHUB_AUTH_URL}>
                    <img className="social-image" src={ghLogo} alt="Github"/>
                    <div className="social-text">Log in with Github</div>
                </a>
                <a className="btn-social btn-block social-btn" href={GOOGLE_AUTH_URL}>
                    <img className="social-image" src={googleLogo} alt="Google"/>
                    <div className="social-text">Log in with Google</div>
                </a>
            </div>
        );
    }
}

export default withRouter(Login)