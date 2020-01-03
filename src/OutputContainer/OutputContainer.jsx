import * as React from "react";
import "./OutputContainer.css"

export default class OutputContainer extends React.PureComponent{
    render() {

        let errorClass = this.props.data.errors[0] ? 'errors ' : '';
        let classes = errorClass + "output";

        return(
            <div className={classes}>
                {this.props.data.errors}
                {this.props.data.output}
            </div>
        )
    }
}