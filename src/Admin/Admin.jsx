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
import Pagination from 'react-responsive-pagination';

class Admin extends React.PureComponent {

  state = {
    taskText: "",
    results: [],
    section: "",
    count: 0,
    activePage: 1,
    search: "",
    screenWidth: 0,
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
      getResults({page: 0, search: ""}).then(response => {
        this.props.setLoading(false);
        this.setState({results: response.content, count: response.totalPages});
      }).catch((error) => {
            this.props.setLoading(false);
            alert(error.message || "Something went wrong, can't load results")
          }
      );
    }
    this.setState({screenWidth: window.innerWidth});
    const resizeHandler = () => {
      this.setState({screenWidth: window.innerWidth});
    };
    window.addEventListener('resize', resizeHandler);
  }

  handleSearch = () => {
    this.setState({activePage: 1}, () => {
      this.updateTable();
    });
  }

  setCurrentPage = (page) => {
    this.setState({activePage: page}, () => {
      this.updateTable();
    });
  }

  updateTable = () => {
    this.props.setLoading(true);
    getResults(
        {page: this.state.activePage - 1, search: this.state.search}).then(
        response => {
          this.props.setLoading(false);
          this.setState(
              {results: response.content, count: response.totalPages});
        }).catch((error) => {
          this.props.setLoading(false);
          alert(error.message || "Something went wrong, can't load results")
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
            <td>{item.numberOfTries}</td>
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
            <div className={"search"}>
              <input type="search"
                     autoComplete="off"
                     id={"search"}
                     className={"searchField"}
                     placeholder={"Search"}
                     onChange={this.handleChange}
                     value={this.state.search}/>

              <Button className={"searchButton"} variant="secondary"
                      onClick={this.handleSearch}>
                Search
              </Button>
            </div>

            <Table responsive>
              <thead>
              <tr>
                <th>Name</th>
                <th>Mail</th>
                <th>Tries</th>
                <th>Result</th>
                <th>Reset</th>
              </tr>
              </thead>
              <tbody>
              {items}
              </tbody>
            </Table>
            <Pagination
                current={this.state.activePage}
                total={this.state.count}
                maxWidth={this.state.screenWidth - 100}
                onPageChange={this.setCurrentPage}
            />
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