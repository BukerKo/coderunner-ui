import * as React from "react";
import {Button, Form} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {
  deleteResult,
  getResults,
  getTask,
  setTask
} from "../Service/RestService";
import trashImg from '../img/trash.svg'

import './Admin.css'
import Table from "react-bootstrap/Table";

class Admin extends React.PureComponent {

  state = {
    taskText: "",
    results: [],
    section: "",
  };

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const section = params.get("section");
    this.setState({section: section});
    if (section === "task") {
      this.props.setLoading(true);
      getTask().then(response => {
        this.props.setLoading(false);
        this.setState({taskText: response.task});
      }).catch((error) => {
            this.props.setLoading(false);
            alert(error.message || "Something went wrong, can't load task")
          }
      );
    } else {
      this.props.setLoading(true);
      getResults().then(response => {
        this.props.setLoading(false);
        this.setState({results: response});
      }).catch((error) => {
            this.props.setLoading(false);
            alert(error.message || "Something went wrong, can't load results")
          }
      );
    }
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

  deleteItem = (id) => {
    this.props.setLoading(true);
    deleteResult({
      id: id
    }).then(() => {
      this.props.setLoading(false);
      this.componentDidMount();
    }).catch((error) => {
          this.props.setLoading(false);
          alert(error.message || "Something went wrong!");
        }
    );
  };

  render() {
    const items = this.state.results.map(item => {
      return (
          <tr key={item.id}>
            <td>{item.user.username}</td>
            <td>{item.user.email}</td>
            <td><a href={item.pathToLastAttempt}>Open</a></td>
            <td>
              <div style={{textAlign: "center", minWidth: "50px"}}>
                <Button variant="danger"
                        onClick={() => this.deleteItem(item.id)}><img
                    height={16} width={14} src={trashImg}
                    alt={"remove"}/></Button>
              </div>
            </td>
          </tr>
      )
    });

    return (

        <div>
          {this.state.section === "results" &&
          <div className="table">
            <Table responsive>
              <thead>
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Result</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {items}
              </tbody>
            </Table>
            <hr/>
            <Link to={"/student"}>
              <Button className="button" variant="secondary">
                Go to student's page
              </Button>
            </Link>
          </div>
          }

          {this.state.section !== "results" &&
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
          }
        </div>
    );
  }
}

export default withRouter(Admin)