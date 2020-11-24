import * as React from "react";
import {Button, Form} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import {signup} from "../Service/RestService";
import './Signup.css'
import {withRouter} from "react-router-dom";
import {CAPTCHA_KEY} from "../constants";

class Signup extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        repeatPassword: '',
        captchaValue: null
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const {captchaValue, firstName, lastName, password, repeatPassword, email} = this.state;

        if (!captchaValue) {
            alert('Please submit captcha');
        } else if (!(firstName && lastName && password && repeatPassword && email)) {
            alert('All fields should be filled');
        } else if (password !== repeatPassword) {
            alert('Password confirmation does not match actual password')
        } else {
            const username = firstName + ' ' + lastName;
            const signupRequest = {
                username,
                password,
                email
            };
            this.props.setLoading(true);
            signup(signupRequest)
                .then(() => {
                    this.props.setLoading(false);
                    this.props.history.push({
                        pathname: '/',
                        search: '?verifyEmail=true'
                    })
                }).catch(error => {
                this.props.setLoading(false);
                alert(error.message || 'Sorry! Something went wrong. Please try again!');
            });
        }
    };

    handleChange = (event) => {
        const {target} = event;
        this.setState({[target.id]: target.value});
    };

    handleCaptchaChange = (captchaValue) => {
        this.setState({captchaValue});
    }

    render() {
        return (
            <div className="form">
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

                    <ReCAPTCHA style={{ display: "inline-block" }} sitekey={CAPTCHA_KEY} onChange={this.handleCaptchaChange}/>

                    <Button className="signup-button" variant="secondary" type="submit">
                        Sign up
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Signup);