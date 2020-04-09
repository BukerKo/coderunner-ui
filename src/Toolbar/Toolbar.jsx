import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import './Toolbar.css'
import {Button, Dropdown} from "react-bootstrap";

import Switch from './Switch';
import * as Cookies from "js-cookie";
import {CURRENT_ROLE, ROLE_ADMIN} from "../constants";
import {applyFeatures, getFeatures} from "../Service/RestService";

export default class Toolbar extends React.PureComponent {

  state = {
    data: [],
  };

  componentDidMount() {
    //this.props.setLoading(true);
    getFeatures()
    .then((response) => {
      //this.props.setLoading(false);
      this.setState({data: response});
    }).catch(error => {
      //this.props.setLoading(false);
      alert(error.message || 'Sorry! Something went wrong. Please try again!')
    });
  }

  handleChange = (event) => {
    const {id} = event.currentTarget;
    this.getValue(id).enabled = event.target.checked;
    applyFeatures(this.state.data);
  };

  getValue(id) {
    return this.state.data.find(o => o.id.toString() === id.toString());
  }

  handleLogout = () => {
    this.props.handleLogout();
  };

  render() {
    let toolbarText = "CodeRunner";
    const {username} = this.props;
    if (username) {
      toolbarText = "Hello, " + username + "!";
    }

    const listItems = this.state.data.map((item) =>
        <div className="switches" key={item.id}>
          <div className="switches-text">
            {item.displayName}
          </div>
          <label className="switch">
            <input type="checkbox"
                   id={item.id}
                   key={item.id}
                   defaultChecked={this.getValue(item.id).enabled}
                   onChange={this.handleChange}/>
            <span className="slider round"/>
          </label>
        </div>
    );

    return (
        <Navbar className="justify-content-between">
          <Navbar.Brand>
            {toolbarText}
          </Navbar.Brand>
          <Navbar.Text>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Menu
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className={"center"}>
                  <Switch/>
                </div>
                {Cookies.get(CURRENT_ROLE) === ROLE_ADMIN &&
                <div className={"controls"}>
                  {listItems}
                  <Dropdown.Item className={"item"} href="/admin">Set task</Dropdown.Item>
                </div>
                }
                <div className={"center"}>
                  <Button variant="secondary"
                          onClick={this.handleLogout}>Logout</Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Text>
        </Navbar>
    )
  }
}