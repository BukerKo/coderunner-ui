import * as React from "react";

export default class OutputContainer extends React.PureComponent{
    render() {
        return(
            <div>
                {this.props.data.errors}
                {this.props.data.output}
            </div>
        )
    }
}