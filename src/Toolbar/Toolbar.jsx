import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import './Toolbar.css'
import {Button, Dropdown} from "react-bootstrap";

import Switch from './Switch';
import {ROLE_ADMIN} from "../constants";
import {applyFeatures} from "../Service/RestService";
import {LinkIcon} from "./LinkIcon";

export default class Toolbar extends React.PureComponent {

  handleChange = (event) => {
    const {id} = event.currentTarget;
    this.getValue(id).enabled = event.target.checked;
    applyFeatures(this.props.features).catch((error) =>
        alert(error || "Something went wrong. Can't update settings")
    );
  };

  getValue(id) {
    return this.props.features.find(o => o.id.toString() === id.toString());
  }

  handleLogout = () => {
    this.props.handleLogout();
  };

  render() {
    let toolbarText = "CodeRunner";
    const {username, role} = this.props;
    if (username) {
      toolbarText = "Hello, " + username + "!";
    }

    const listItems = this.props.features.map((item) =>
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
            {!username &&
            <div className={"topMargin"}>
              <label className="switch">
                <Switch/>
              </label>
            </div>
            }
            {username &&
            <Dropdown alignRight>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Menu
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="switches">
                  <div className="switches-text">
                    Dark mode
                  </div>
                  <label className="switch">
                    <Switch/>
                  </label>
                </div>
                {role === ROLE_ADMIN &&
                <div>
                  {listItems}
                  <Dropdown.Item className={"item"} href="/admin?section=task">Set
                    task
                    <label className="switch">
                      <LinkIcon className={"linkImg"}/>
                    </label>
                  </Dropdown.Item>
                  <Dropdown.Item className={"item"}
                                 href="/admin?section=results">View
                    results
                    <label className="switch">
                      <LinkIcon className={"linkImg"}/>
                    </label>
                  </Dropdown.Item>
                </div>
                }
                <div className={"center"}>
                  <Button variant="secondary"
                          onClick={this.handleLogout}>Logout</Button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            }
          </Navbar.Text>
        </Navbar>
    )
  }
}