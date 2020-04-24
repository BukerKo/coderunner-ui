import * as React from "react";
import {Button} from "react-bootstrap";
import {Link, withRouter} from "react-router-dom";
import {deleteResult, getResults,} from "../Service/RestService";
import trashImg from '../img/trash.svg'

import './Results.css'
import Table from "react-bootstrap/Table";
import Pagination from 'react-responsive-pagination';

class Results extends React.PureComponent {

  state = {
    results: [],
    section: "",
    count: 0,
    activePage: 1,
    search: "",
    screenWidth: 0,
  };

  componentDidMount() {
    this.updateTable();
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

  handleSearchChange = (event) => {
    const {id, value} = event.currentTarget;
    this.setState({[id]: value});
    if (id === "search" && value === "") {
      this.setState({activePage: 1}, () => {
        this.updateTable();
      });
    }
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
          <div className="table">
            <div className={"search"}>
              <input type="search"
                     autoComplete="off"
                     id={"search"}
                     className={"searchField"}
                     placeholder={"Search"}
                     onChange={this.handleSearchChange}
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

export default withRouter(Results)