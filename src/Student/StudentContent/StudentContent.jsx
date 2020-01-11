import * as React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TaskContainer from "../TaskContainer/TaskContainer";
import CodeEditor from "../CodeEditor/CodeEditor";
import OutputContainer from "../OutputContainer/OutputContainer";
import './StudentContent.css'
import LoadingOverlay from "react-loading-overlay";
import ReactLoading from "react-loading";
import {executeCode} from "../../Service/RestService";
import {SOURCECODE_KEY} from "../../constants";

export default class StudentContent extends React.PureComponent {

    state = {
        result: {
            errors: [],
            output: []
        },
        isLoading: false
    };

    handleSubmit = (className) => {
        const requestBody = {
            sourceCode: localStorage.getItem(SOURCECODE_KEY),
            className
        };

        this.setState({isLoading: true}, () => {
            executeCode(requestBody)
                .then(result => {
                    this.setState({
                        result,
                        isLoading: false
                    });
                });
        })
    };

    render() {
        return (
                <LoadingOverlay
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            background: "rgba(0, 0, 0, 0)"
                        })
                    }}
                    active={this.state.isLoading}
                    spinner={
                        <div className="loader">
                            <ReactLoading type={"spin"} color={"black"}/>
                        </div>
                    }
                >

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
                </LoadingOverlay>
        )
    }
}
