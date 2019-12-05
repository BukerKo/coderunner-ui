import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CodeEitor.css"
import {INDENTSYMBOL, initialClassName, initialCode, TABKEY} from "../constants";

export default class CodeEditor extends React.PureComponent {

    inputRef = React.createRef();

    state = {
        sourceCode: initialCode,
        className: initialClassName
    };

    handleKeyDown = event => {
        if (event.keyCode === TABKEY) {
            event.preventDefault();
            this.addTabToCode(event.target);
        }
    };

    addTabToCode = ({selectionStart, selectionEnd}) => {
        const {sourceCode} = this.state;
        this.setState({
            sourceCode: sourceCode.substring(0, selectionStart) + INDENTSYMBOL + sourceCode.substring(selectionEnd)
        }, () => {
            this.inputRef.current.selectionStart = this.inputRef.current.selectionEnd = selectionStart + INDENTSYMBOL.length;
        })
    };

    handleChange = event => {
        console.log(event);
        this.setState({sourceCode: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({className: this.getClassName()}, () => {
           this.props.handleSubmit(this.state);
        });

    };

    getClassName = () => {
      const { sourceCode } = this.state;
      const startPosition = sourceCode.indexOf("class") + "class".length + 1;
      const endPosition = sourceCode.indexOf("{", startPosition) - 1;
      return sourceCode.substring(startPosition, endPosition);
    };

    render() {
        return (
            <Form>
                <Form.Control as={"textarea"} ref={this.inputRef}
                              onKeyDown={this.handleKeyDown}
                              onChange={this.handleChange}
                              value={this.state.sourceCode}/>
                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Run
                </Button>
            </Form>
        )
    }
}