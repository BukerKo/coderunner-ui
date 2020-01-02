import React from 'react';
import Toolbar from "./Toolbar/Toolbar";

import ContentContainer from "./ContentContainer/ContentContainer";
import ReactLoading from "react-loading";
import LoadingOverlay from "react-loading-overlay";

class App extends React.Component {

    state = {
        isLoading: false
    };

    setLoading = (isLoading) => {
        this.setState({isLoading});
    };

    render() {
        return (
            <div className="App">
                <LoadingOverlay
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            background: "rgba(0, 0, 0, 0)"
                        })
                    }}
                    active={this.state.isLoading}
                    spinner={
                        <div className="loader">
                            <ReactLoading type={"spin"} color={"black"}/>
                        </div>
                    }
                >

                    <Toolbar/>
                    <ContentContainer setLoading={this.setLoading}/>

                </LoadingOverlay>
            </div>
        );
    }
}

export default App;
