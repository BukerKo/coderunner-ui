import * as React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TaskContainer from "../TaskContainer/TaskContainer";
import CodeEditor from "../CodeEditor/CodeEditor";
import OutputContainer from "../OutputContainer/OutputContainer";
import './ContentContainer.css'

export default class ContentContainer extends React.PureComponent {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col className='task-col' sm={2}>
                            <TaskContainer/>
                        </Col>
                        <Col className='editor-col'>
                            <CodeEditor/>
                        </Col>
                        <Col className='output-col' sm={4}>
                            <OutputContainer/>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}