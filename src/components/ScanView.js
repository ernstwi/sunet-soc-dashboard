import React from "react";

import ScanDetail from "./ScanDetail";

class ScanView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            object: null
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch(
            `${window.injectedEnv.COLLECTOR_URL}/sc/v0/get/${this.props.id}`,
            {
                headers: {
                    Authorization: "Bearer " + this.props.token
                }
            }
        )
            // TODO: Look at `status` or return code or both?
            .then(resp => {
                if (resp.status !== 200)
                    throw new Error(
                        `Unexpected HTTP response code from soc_collector: ${resp.status} ${resp.statusText}`
                    );
                return resp.json();
            })
            .then(json => {
                if (json.status != "success")
                    throw new Error(
                        `Unexpected status from soc_collector: ${json.status}`
                    );
                this.setState({
                    object: json.docs
                });
            })
            .catch(e => this.props.setError(e));
    }

    render() {
        return this.state.object === null ? null : (
            <ScanDetail {...this.state.object} />
        );
    }
}

export default ScanView;
