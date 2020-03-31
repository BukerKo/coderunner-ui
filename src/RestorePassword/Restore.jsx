import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import './Restore.css'
import {confirmRestore, requestRestore} from "../Service/RestService";

class Restore extends React.PureComponent {

    state = {
        text: "Email",
        type: "usernameOrEmail",
        value: "",
        token: null,
    };

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if(token) {
            this.setState({token: token, text: "New password", type: "password"});
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const {id, value} = event.currentTarget;
        this.setState({[id]: value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.setLoading(true);
        if(!this.state.token) {
            const {value} = this.state;
            requestRestore({email: value})
            .then(() => {
                this.props.setLoading(false);
                alert('If user with this email exists, link was sent to it');
                this.props.history.push('/login');
            }).catch(error => {
                this.props.setLoading(false);
                alert(error.message
                    || 'Sorry! Something went wrong. Please try again!');
            });
        }
        else {
            const {token, value, repeat} = this.state;
            if(value === repeat) {
                confirmRestore({token: token, password: value})
                .then(() => {
                    this.props.setLoading(false);
                    alert('Now you can login with new password');
                    this.props.history.push('/login');
                }).catch(error => {
                    this.props.setLoading(false);
                    alert(error.message
                        || 'Sorry! Something went wrong. Please try again!');
                    this.props.history.push('/restore');
                });
            }
            else {
                alert('Passwords must match');
            }
        }
    };

    render() {
        return (
            <div className="restore">
                <h1 className="login-title">Restore password</h1>
                <Form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
                    <Form.Group controlId="value">
                        <Form.Control type={this.state.type}
                                      placeholder={this.state.text}
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    { this.state.token ?
                        <Form.Group controlId="repeat">
                        <Form.Control type="password"
                                      placeholder="Repeat password"
                                      onChange={this.handleChange}/>
                        </Form.Group> : null }

                    <Button className="button" variant="primary" type="submit">
                        Next
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Restore)