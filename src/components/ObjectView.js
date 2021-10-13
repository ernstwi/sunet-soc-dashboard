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
        fetch(`http://localhost:8000/sc/v0/get/${this.props.id}`, {
            headers: {
                Authorization: "Basic " + btoa("user1:pw1")
            }
        })
            .then(resp => resp.json())
            .then(resp => {
                // TODO: Look at `status` or return code or both?
                if (resp.status != "success")
                    throw `soc_collector responded: ${resp.status}`;
                return resp.data;
            })
            .then(object => this.setState({ object: object }))
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
