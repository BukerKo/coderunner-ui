import * as React from "react";
import Button from "react-bootstrap/Button";
import "./CodeEditor.css"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-crimson_editor";
import {SOURCECODE_KEY, TOOLTIP_TEXT} from "../../constants";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import questionImg from '../../img/ask.png'
import {getFeatures} from "../../Service/RestService";

export default class CodeEditor extends React.PureComponent {

    state = {
        features: []
    };

    componentDidMount() {
        getFeatures().then(result => {
            this.setState({features: result})
        });
    }

    handleChange = sourceCode => {
        localStorage.setItem(SOURCECODE_KEY, sourceCode);
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.getClassName());
    };

    getClassName = () => {
        const sourceCode = localStorage.getItem(SOURCECODE_KEY);
        const startPosition = sourceCode.indexOf("class") + "class".length + 1;
        const endPosition = sourceCode.indexOf("{", startPosition) - 1;
        return sourceCode.substring(startPosition, endPosition);
    };

    renderTooltip = (props) => {
        return <Tooltip {...props} id="send_code_tooltip">{TOOLTIP_TEXT}</Tooltip>
    };

    render() {
        const {features} = this.state;
        const {numberOfTries} = this.props;
        const gatherInfoEnabled = features.length ? features.find(feature => feature.featureName === "gatherInformation").enabled : false;
        return (
            <div className={"editor_div"}>
                <div className={"wrapper"}>
                    <AceEditor
                        mode="java"
                        theme="crimson_editor"
                        showPrintMargin={false}
                        fontSize={22}
                        width={"100%"}
                        height={"100%"}
                        onChange={this.handleChange}
                        enableBasicAutocompletion={true}
                        enableLiveAutocompletion={true}
                        editorProps={{$blockScrolling: true}}
                        value={localStorage.getItem(SOURCECODE_KEY)}
                    />
                </div>
                <div className="d-flex button_bar ">
                    <Button className="submit_button" variant="primary" type="submit" onClick={this.handleSubmit}>
                        Run
                    </Button>
                    {gatherInfoEnabled && <Button className="number_of_tries" disabled={true} variant="outline-info">
                        Try #{numberOfTries}
                    </Button>}
                    <OverlayTrigger
                        placement="top"
                        delay={{show: 250, hide: 400}}
                        overlay={this.renderTooltip}>
                        <Button className="send_code_button" variant="secondary" onClick={this.props.sendCode}>
                            Send code
                            <img className="question_mark" width="20px" src={questionImg} alt="question mark"/>
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>
        )
    }
}