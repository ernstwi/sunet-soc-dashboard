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
            .then(resp => {
                if (resp.status !== 200)
                    throw new Error(
                        `Unexpected HTTP response code from soc_collector: ${resp.status} ${resp.statusText}`
                    );
                return resp.json();
            })
            .then(json => {
                this.setState({
                    object: {
                        ...json.docs,
                        timestamp_in_utc: new Date(
                            json.docs.timestamp_in_utc.replace(/ UTC$/, "Z")
                        )
                    }
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
