import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {getTask, setTask} from "../Service/RestService";

import './Task.css'

class Task extends React.PureComponent {

  state = {
    taskText: "",
  };

  componentDidMount() {
      this.props.setLoading(true);
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
    if (id === "search" && value === "") {
      this.setState({activePage: 1}, () => {
        this.updateTable();
      });
    }
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

        <div>
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
            <Link to={"/editor"}>
              <Button className="button" variant="secondary">
                Go to editor
              </Button>
            </Link>
          </div>
        </div>
    );
  }
}

export default withRouter(Task)