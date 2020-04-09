import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {getTask, setTask} from "../Service/RestService";

import './Admin.css'

class Admin extends React.PureComponent {

  state = {
    taskText: "",
  };

  componentDidMount() {
    this.props.setLoading(true);
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    getTask().then(response => {
      this.props.setLoading(false);
      this.setState({taskText: response.task});
    }).catch((error) => {
          this.props.setLoading(false);
          alert(error.message || "Something went wrong, can't load task")
        }
    );

  }

  handleChange = (event) => {
    const {id, value} = event.currentTarget;
    this.setState({[id]: value});
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setLoading(true);
    setTask(this.state.taskText)
    .then(() => {
      this.props.setLoading(false);
      alert("Task updated")
    }).catch(error => {
      this.props.setLoading(false);
      alert(error.message || 'Sorry! Something went wrong. Please try again!')
    });
  };

  render() {

    return (
        <div className="form">
          <Form onSubmit={this.handleSubmit} autoComplete='off' noValidate>
            <Form.Group controlId="taskText">
              <Form.Label>Task</Form.Label>
              <Form.Control as="textarea" rows="5"
                            onChange={this.handleChange}
                            value={this.state.taskText}/>
            </Form.Group>
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