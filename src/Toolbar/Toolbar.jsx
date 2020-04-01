import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import './Toolbar.css'
import {Button} from "react-bootstrap";

import Switch from './Switch';

export default class Toolbar extends React.PureComponent {

  handleLogout = () => {
    this.props.handleLogout();
  };

  render() {
    let toolbarText = "CodeRunner";
    const {username} = this.props;
    if (username) {
      toolbarText = "Hello, " + username + "!";
    }

    return (
        <Navbar className="justify-content-between">
          <Navbar.Brand>
              {toolbarText}
          </Navbar.Brand>
          <Navbar.Text>
            <Switch/>
          </Navbar.Text>
          {username &&
            <Button variant="secondary" onClick={this.handleLogout}>Logout</Button>
          }
        </Navbar>
    )
  }
}