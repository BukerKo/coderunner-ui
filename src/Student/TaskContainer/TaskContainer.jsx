import * as React from "react";
import './TaskContainer.css'

export default class TaskContainer extends React.PureComponent{

    render() {
        return (
            <div className="task">
                Print out "Hello World!"
            </div>
        )
    }
}