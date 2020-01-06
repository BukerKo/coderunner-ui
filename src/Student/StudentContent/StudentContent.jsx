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
import {withRouter} from "react-router-dom";
import * as Cookies from "js-cookie";
import {ACCESS_TOKEN, CURRENT_ROLE, CURRENT_USERNAME} from "../../constants";


class StudentContent extends React.PureComponent {

    state = {
        result: {
            errors: [],
            output: []
        },
        isLoading: false
    };

    handleLogout = () => {
        Cookies.remove(CURRENT_USERNAME);
        Cookies.remove(CURRENT_ROLE);
        Cookies.remove(ACCESS_TOKEN);
        this.props.history.push("/");
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
                <Toolbar handleLogout={this.handleLogout}/>
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

export default withRouter(StudentContent)