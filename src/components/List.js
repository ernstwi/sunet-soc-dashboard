import React from "react";
import { Button } from "semantic-ui-react";

import ObjectComponent from "./ObjectComponent";
import SearchForm from "./SearchForm";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            filter: {
                field: "default-field",
                value: ""
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    // Fetch data from external source, update state
    getData() {
        fetch("http://localhost:8000/sc/v0/get", {
            headers: {
                Authorization: "Basic " + btoa("user1:pw1")
            }
        })
            .then(resp => resp.json())
            .then(data => this.setState({ objects: data }));
    }

    filter(field, value) {
        this.setState(
            {
                filter: {
                    field: field,
                    value: value
                }
            },
            this.getData
        );
    }

    render() {
        return (
            <div id="list-container">
                <div id="controls">
                    <div id="action">
                        <Button.Group>
                            <Button>Action 1</Button>
                            <Button>Action 2</Button>
                        </Button.Group>
                    </div>
                    <div id="search">
                        <SearchForm filter={this.filter} />
                    </div>
                </div>
                <div id="main">
                    {this.state.objects.map(data => {
                        console.log(data);
                        return <ObjectComponent {...data} key={data._id} />;
                    })}
                </div>
            </div>
        );
    }
}

export default List;
