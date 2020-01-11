import * as React from "react";
import Button from "react-bootstrap/Button";
import "./CodeEditor.css"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-crimson_editor";
import { SOURCECODE_KEY} from "../../constants";

export default class CodeEditor extends React.PureComponent {

    handleChange = sourceCode => {
        localStorage.setItem("sourceCode", sourceCode);
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.getClassName());
    };

    getClassName = () => {
      const { sourceCode } = localStorage.getItem(SOURCECODE_KEY);
      const startPosition = sourceCode.indexOf("class") + "class".length + 1;
      const endPosition = sourceCode.indexOf("{", startPosition) - 1;
      return sourceCode.substring(startPosition, endPosition);
    };

    render() {
        const sourceCode = localStorage.getItem(SOURCECODE_KEY);
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
                    value={sourceCode}
                />
                <Button className={"submit_button"} variant="primary" type="submit" onClick={this.handleSubmit}>
                    Run
                </Button>
            </div>
        )
    }
}