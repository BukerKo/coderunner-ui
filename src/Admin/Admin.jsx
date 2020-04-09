import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {applyFeatures, getFeatures} from "../Service/RestService";

import './Admin.css'

class Admin extends React.PureComponent {

  state = {
    data: [],
  };

  componentDidMount() {
    this.props.setLoading(true);
    getFeatures()
    .then((response) => {
      this.props.setLoading(false);
      this.setState({data: response});
    }).catch(error => {
      this.props.setLoading(false);
      alert(error.message || 'Sorry! Something went wrong. Please try again!')
    });
  }

  handleChange = (event) => {
    const {id} = event.currentTarget;
    this.getValue(id).enabled = event.target.checked;
  };

  getValue(id) {
    return this.state.data.find(o => o.id.toString() === id.toString());
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setLoading(true);
    applyFeatures(this.state.data)
    .then(() => {
      this.props.setLoading(false);
      alert("Settings applied")
    }).catch(error => {
      this.props.setLoading(false);
      alert(error.message || 'Sorry! Something went wrong. Please try again!')
    });
  };

  render() {
    const listItems = this.state.data.map((item) =>
        <div className="container" key={item.id}>
          {item.displayName}
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
            <div className="form">
              <Form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
                {listItems}
                <Button className="button" variant="secondary"
                        type="submit">
                  Save
                </Button>
              </Form>
              <hr/>
              <Link to={"/student"}>
              <Button className="button" variant="secondary">
                Go to student's page
              </Button>
              </Link>
            </div>
    );
  }
}

export default withRouter(Admin)