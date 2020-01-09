import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import './Toolbar.css'
import {Button} from "react-bootstrap";


export default class Toolbar extends React.PureComponent {

    handleLogout = () => {
        this.props.handleLogout();
    };


    render() {
        let toolbarText = "Coderunner application";
        const {username} = this.props;
        if (username) {
            toolbarText = "Hello, " + username + "!";
        }
        return (
            <Navbar className="justify-content-between">
                <Navbar.Brand>{toolbarText}</Navbar.Brand>
                {username && <Button variant="info" onClick={this.handleLogout}>Logout</Button>}
            </Navbar>
        )
    }
}