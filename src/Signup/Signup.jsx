import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {signup} from "../Service/RestService";
import './Signup.css'

export default class Signup extends React.Component {

    state = {
        username: '',
        password: '',
        email: '',
        repeatPassword: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {username, password, repeatPassword, email} = this.state;
        const signupRequest = {
            username,
            password,
            email
        };

        if (!(username && password && repeatPassword && email)) {
            alert('All fields should be filled');
        } else if (password !== repeatPassword) {
            alert('Password confirmation does not match actual password')
        } else {
            signup(signupRequest)
                .then(response => {
                    const {accessToken, role, username} = response;
                    this.props.handleLogin(accessToken, role, username);
                }).catch(error => {
                alert(error.message || 'Sorry! Something went wrong. Please try again!');
            });
        }
    };

    handleChange = (event) => {
        const {target} = event;
        this.setState({[target.id]: target.value})
    };

    render() {
        return (
            <div className="register">
                <h1>Sign up</h1>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Form.Group controlId="username">
                        <Form.Label column={false}>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label column={false}>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="repeatPassword">
                        <Form.Label column={false}>Confirm password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label column={false}>Email</Form.Label>
                        <Form.Control type="email" placeholder="example@email.com" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign up
                    </Button>
                </Form>
            </div>
        );
    }
}