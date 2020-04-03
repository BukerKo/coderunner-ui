import * as React from "react";
import './TaskContainer.css'
import {getTask} from "../../Service/RestService";

export default class TaskContainer extends React.PureComponent {

  state = {
    task: ""
  };

  componentDidMount() {
    this.props.setLoading(true);
    getTask().then(response => {
      this.props.setLoading(false);
      this.setState({task: response.task});
    }).catch((error) => {
          this.props.setLoading(false);
          alert(error.message || "Something went wrong, can't load task")
        }
    );
  }

  render() {
    return (
        <div className="task">
          {this.state.task}
        </div>
    )
  }
}