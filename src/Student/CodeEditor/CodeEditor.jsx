import * as React from "react";
import Button from "react-bootstrap/Button";
import "./CodeEditor.css"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-crimson_editor";
import {INITIAL_CLASS_NAME, INITIAL_CODE} from "../../constants";

export default class CodeEditor extends React.PureComponent {

    state = {
        sourceCode: INITIAL_CODE,
        className: INITIAL_CLASS_NAME
    };

    handleChange = sourceCode => {
        this.setState({sourceCode});
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
            <div className={"editor_div"}>
                <AceEditor
                    mode="java"
                    theme="crimson_editor"
                    showPrintMargin={false}
                    fontSize={22}
                    width={"100%"}
                    height={"90%"}
                    onChange={this.handleChange}
                    enableBasicAutocompletion={true}
                    enableLiveAutocompletion={true}
                    editorProps={{ $blockScrolling: true }}
                    value={this.state.sourceCode}
                />
                <Button className={"submit_button"} variant="primary" type="submit" onClick={this.handleSubmit}>
                    Run
                </Button>
            </div>
        )
    }
}