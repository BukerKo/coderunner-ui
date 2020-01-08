import * as React from "react";
import {Col, Container, Row} from "react-bootstrap";
import TaskContainer from "../TaskContainer/TaskContainer";
import CodeEditor from "../CodeEditor/CodeEditor";
import OutputContainer from "../OutputContainer/OutputContainer";
import './StudentContent.css'
import LoadingOverlay from "react-loading-overlay";
import ReactLoading from "react-loading";
import {executeCode} from "../../Service/RestService";
import Toolbar from "../../Toolbar/Toolbar";


export default class StudentContent extends React.PureComponent {

    state = {
        result: {
            errors: [],
            output: []
        },
        isLoading: false
    };

    handleSubmit = (data) => {
        this.setState({isLoading: true}, () => {
            executeCode(data)
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
            <div>
                <Toolbar handleLogout={this.props.handleLogout}/>
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
            </div>
        )
    }
}
