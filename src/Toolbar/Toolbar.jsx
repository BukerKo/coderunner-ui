import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import './Toolbar.css'

export default class Toolbar extends React.PureComponent {

    render() {
        return (
            <Navbar>
                <Navbar.Brand>Hello, username!</Navbar.Brand>
            </Navbar>
        )
    }
}