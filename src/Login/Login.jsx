import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import './Login.css'
import {login} from "../Service/RestService";


class Login extends React.Component {

    state = {
        usernameOrEmail: "",
        password: "",
    };

    handleChange = (event) => {
        event.preventDefault();

        let {id, value} = event.currentTarget;

        this.setState({[id]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {usernameOrEmail, password} = this.state;

        if (!usernameOrEmail || !password) {
            alert('Username and password should not be empty');
            return;
        }

        login({usernameOrEmail: usernameOrEmail, password: password})
            .then(response => {
                const {accessToken, role, username} = response;
                this.props.handleLogin(accessToken, role, username);
            }).catch(error => {
            if (error.status === 401) {
                alert('Your Username or Password is incorrect. Please try again!');
            } else {
                alert(error.message || 'Sorry! Something went wrong. Please try again!')
            }
        });
    };

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <Form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
                    <Form.Group controlId="usernameOrEmail">
                        <Form.Label column={false}>Enter email address or username</Form.Label>
                        <Form.Control type="usernameOrEmail" placeholder="Username/Email" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label column={false}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>

                    <Link to={"/signup"}>
                        <Button id={'register'} variant="secondary" type="button">
                            Sign up
                        </Button>
                    </Link>
                </Form>
            </div>
        );
    }
}

export default Login