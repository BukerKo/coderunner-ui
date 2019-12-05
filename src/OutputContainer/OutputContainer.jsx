import * as React from "react";
import "./OutputContainer.css"

export default class OutputContainer extends React.PureComponent{
    render() {
        return(
            <div className={"output"}>
                {this.props.data.errors}
                {this.props.data.output}
            </div>
        )
    }
}