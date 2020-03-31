import * as React from "react";
import "./OutputContainer.css"

export default class OutputContainer extends React.PureComponent{
    render() {
        return(
            <div>
                <div className="output">
                    {this.props.data.output}
                  <div className="errors">
                    {this.props.data.errors}
                  </div>
                </div>
            </div>
        )
    }
}