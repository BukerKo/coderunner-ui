import * as React from "react";
import {Col, Row} from "react-bootstrap";
import TaskContainer from "../TaskContainer/TaskContainer";
import CodeEditor from "../CodeEditor/CodeEditor";
import OutputContainer from "../OutputContainer/OutputContainer";
import './StudentContent.css'
import {executeCode, getRunInfo, sendCode} from "../../Service/RestService";
import {SOURCECODE_KEY} from "../../constants";

export default class StudentContent extends React.PureComponent {

  state = {
    result: {
      errors: [],
      output: [],
      numberOfTries: 0
    }
  };

  componentDidMount() {
    getRunInfo().then(numberOfTries => this.setState(prevState => ({
          ...prevState,
          result: {
            ...prevState.result,
            numberOfTries
          }
        }
    )))
  }

  handleSubmit = (className) => {
    const requestBody = {
      sourceCode: localStorage.getItem(SOURCECODE_KEY),
      className
    };
    this.props.setLoading(true);
    executeCode(requestBody)
    .then(result => {
      this.props.setLoading(false);
      this.setState({
        result,
      });
    });
  };

  sendCode = () => {
    this.props.setLoading(true);
    sendCode({code: localStorage.getItem(SOURCECODE_KEY)}).then(result => {
      this.props.setLoading(false);
      if (result.status) {
        alert("Successfully sent");
      }
    });
  };

  render() {
    const {result} = this.state;
    return (
        <Row>
          <Col className='task-col' sm={2}>
            <TaskContainer/>
          </Col>
          <Col className='editor-col'>
            <CodeEditor numberOfTries={result.numberOfTries}
                        handleSubmit={this.handleSubmit}
                        sendCode={this.sendCode}/>
          </Col>
          <Col className='output-col' sm={4}>
            <OutputContainer data={result}/>
          </Col>
        </Row>
    )
  }
}
