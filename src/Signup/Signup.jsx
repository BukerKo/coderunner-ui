import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {signup, verifyEmail} from "../Service/RestService";
import './Signup.css'

export default class Signup extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        repeatPassword: ''
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const {firstName, lastName, password, repeatPassword, email} = this.state;

        if (!(firstName && lastName && password && repeatPassword && email)) {
            alert('All fields should be filled');
        } else if (password !== repeatPassword) {
            alert('Password confirmation does not match actual password')
        } else if (!await this.emailVerified(email)) {
            alert('Use existing email')
        } else {
            const username = firstName + ' ' + lastName;
            const signupRequest = {
                username,
                password,
                email
            };
            signup(signupRequest)
                .then(response => {
                    const {accessToken, role, username, provider} = response;
                    this.props.handleLogin(accessToken, role, username, provider);
                }).catch(error => {
                alert(error.message || 'Sorry! Something went wrong. Please try again!');
            });
        }
    };

    emailVerified = async (email) => {
        const {deliverable} = await verifyEmail(email);
        return deliverable;
    };

    handleChange = (event) => {
        const {target} = event;
        this.setState({[target.id]: target.value})
    };

    render() {
        return (
            <div className="register">
                <h1 className={"signup-title"}>Sign up</h1>
                <Form onSubmit={this.handleSubmit} autoComplete='off'>
                    <Form.Group controlId="firstName">
                        <Form.Label column={false}>First name</Form.Label>
                        <Form.Control type="username" placeholder="First name" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label column={false}>Last name</Form.Label>
                        <Form.Control type="username" placeholder="Last name" onChange={this.handleChange}/>
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

                    <Button className="signup-button" variant="primary" type="submit">
                        Sign up
                    </Button>
                </Form>
            </div>
        );
    }
}