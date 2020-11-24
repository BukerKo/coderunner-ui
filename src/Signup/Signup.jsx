import * as React from "react";
import {Button, Form} from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import {signup} from "../Service/RestService";
import './Signup.css'
import {withRouter} from "react-router-dom";
import {CAPTCHA_KEY} from "../constants";
import {useState} from "react";

function Signup() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

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

    return (
        <div className="form">
            <h1 className={"signup-title"}>Sign up</h1>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Group controlId="firstName">
                    <Form.Label column={false}>First name</Form.Label>
                    <Form.Control type="username" placeholder="First name"
                                  onChange={e => setFirstName(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label column={false}>Last name</Form.Label>
                    <Form.Control type="username" placeholder="Last name"
                                  onChange={e => setLastName(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label column={false}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  onChange={e => setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="repeatPassword">
                    <Form.Label column={false}>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  onChange={e => setRepeatPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label column={false}>Email</Form.Label>
                    <Form.Control type="email" placeholder="example@email.com"
                                  onChange={e => setEmail(e.target.value)}/>
                </Form.Group>

                <ReCAPTCHA style={{display: "inline-block"}}
                           sitekey={CAPTCHA_KEY}
                           onChange={e => setCaptchaValue(e.target.value)}/>

                <Button className="signup-button" variant="secondary" type="submit">
                    Sign up
                </Button>
            </Form>
        </div>
    );
}

export default withRouter(Signup);