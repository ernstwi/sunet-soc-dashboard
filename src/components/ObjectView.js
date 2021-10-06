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
        fetch("http://localhost:8000/sc/v0/get", {
            headers: {
                Authorization: "Basic " + btoa("user1:pw1")
            }
        })
            .then(resp => resp.json())
            // TODO: Proper API call to get single object
            .then(data => data.filter(x => x._id == this.props.id)[0])
            // .then(data => {
            //     console.log(data);
            //     return data;
            // })
            .then(object => this.setState({ object: object }));
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
