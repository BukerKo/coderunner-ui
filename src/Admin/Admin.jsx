import * as React from "react";
import {Button, Container, Form} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {applyFeatures, getFeatures} from "../Service/RestService";
import ReactLoading from "react-loading";
import LoadingOverlay from "react-loading-overlay";

import './Admin.css'

class Admin extends React.Component {

  state = {
    data: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({isLoading: true});
    getFeatures()
    .then((response) => {
      this.setState({isLoading: false, data: response});

    }).catch(error => {
      this.setState({isLoading: false});
      alert(error.message || 'Sorry! Something went wrong. Please try again!')
    });
  }

  handleChange = (event) => {
    const {id} = event.currentTarget;
    this.getValue(id).enabled = event.target.checked;
    this.forceUpdate();
  };

  getValue(id) {
    return this.state.data.find(o => o.id.toString() === id.toString());
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({isLoading: true});
    applyFeatures(this.state.data)
    .then(() => {
      this.setState({isLoading: false});
      alert("Settings applied")
    }).catch(error => {
      this.setState({isLoading: false});
      alert(error.message || 'Sorry! Something went wrong. Please try again!')
    });
  };

  render() {
    const listItems = this.state.data.map((item) =>
        <div className="container">
          {item.displayName}
          <label className="switch">
            <input type="checkbox"
                   id={item.id}
                   key={item.id}
                   checked={this.getValue(item.id).enabled}
                   onChange={this.handleChange}/>
              <span className="slider"/>
          </label>
        </div>
    );

    return (
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
            <div className="admin">
              <Form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
                {listItems}
                <Button className="button" variant="primary"
                        type="submit">
                  Save
                </Button>
              </Form>
            </div>
          </Container>
        </LoadingOverlay>
    );
  }
}

export default withRouter(Admin)