import React from "react";

import ObjectComponent from "./ObjectComponent";

class ObjectView extends React.Component {
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
        fetch(`${process.env.COLLECTOR_URL}/sc/v0/get/${this.props.id}`, {
            headers: {
                Authorization: "Basic " + btoa("user1:pw1")
            }
        })
            // TODO: Look at `status` or return code or both?
            .then(resp => {
                if (resp.status !== 200)
                    throw `Unexpected HTTP response code from soc_collector: ${resp.status} ${resp.statusText}`;
                this.setState({
                    totalPages: resp.headers.get("X-Total-Count")
                });
                return resp.json();
            })
            .then(json => {
                if (json.status != "success")
                    throw `Unexpected status from soc_collector: ${json.status}`;
                this.setState({
                    object: json.data
                });
            })
            .catch(e => this.props.setError(e));
    }

    render() {
        return (
            <div id="object-view">
                {this.state.object === null ? null : (
                    <ObjectComponent {...this.state.object} />
                )}
            </div>
        );
    }
}

export default ObjectView;
