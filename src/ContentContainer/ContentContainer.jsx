import * as React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TaskContainer from "../TaskContainer/TaskContainer";
import CodeEditor from "../CodeEditor/CodeEditor";
import OutputContainer from "../OutputContainer/OutputContainer";
import './ContentContainer.css'
import postData from "../RestService";
import {codeRunnerUrl} from "../constants";

export default class ContentContainer extends React.PureComponent {

    state = {
        result: {
            errors: [],
            output: []
        }
    };

    handleSubmit = (data) => {
        this.props.setLoading(true);
        postData(codeRunnerUrl, data)
            .then(result => {
                this.setState({result});
                this.props.setLoading(false);
            });
    };

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className='task-col' sm={2}>
                            <TaskContainer/>
                        </Col>
                        <Col className='editor-col'>
                            <CodeEditor handleSubmit={this.handleSubmit}/>
                        </Col>
                        <Col className='output-col' sm={4}>
                            <OutputContainer data={this.state.result}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}