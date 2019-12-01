import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CodeEitor.css"
import {TABKEY} from "../constants";

export default class CodeEditor extends React.PureComponent {

    state = {
        inputValue: "",
        placeholder: "Write your code here"
    };

    handleChange = (event) => {
        console.log(event);
        this.setState({inputValue: event.target.value});
    };

    handleSubmit = (event) => {
        alert('Submitted: ' + this.state.inputValue);
        event.preventDefault();
    };

    render() {
        return (
            <Form>
                <Form.Control as={"textarea"} onChange={this.handleChange} placeholder={this.state.placeholder}/>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Submit
                </Button>
            </Form>
        )
    }
}