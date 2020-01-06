import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import './Toolbar.css'
import {CURRENT_USERNAME} from "../constants";
import {Button} from "react-bootstrap";
import * as Cookies from "js-cookie";


export default class Toolbar extends React.PureComponent {

    handleLogout = () => {
        this.props.handleLogout();
    };

    render() {
        return (
            <Navbar className="justify-content-between">
                <Navbar.Brand>Hello, {Cookies.get(CURRENT_USERNAME)}!</Navbar.Brand>
                <Button variant="info" onClick={this.handleLogout}>Logout</Button>
            </Navbar>
        )
    }
}