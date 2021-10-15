import React from "react";
import { Button, Pagination } from "semantic-ui-react";

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
            },
            page: 1,
            totalPages: 1
        };

        this.getData = this.getData.bind(this);
        this.setPage = this.setPage.bind(this);
        this.queryString = this.queryString.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    queryString() {
        return [
            `limit=${process.env.PER_PAGE}`,
            `skip=${this.state.page * process.env.PER_PAGE}`
        ].join("&");
    }

    // Fetch data from external source, update state
    getData() {
        fetch(`${process.env.COLLECTOR_URL}/sc/v0/get?${this.queryString()}`, {
            headers: {
                Authorization: "Basic " + btoa("user1:pw1")
            }
        })
            .then(resp => resp.json())
            .then(resp => {
                // TODO: Look at `status` or return code or both?
                if (resp.status != "success")
                    throw `soc_collector responded: ${resp.status}`;
                return resp;
            })
            .then(resp => this.setState({ objects: resp.data }))
            .catch(e => this.props.setError(e));
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

    setPage(e, { activePage: n }) {
        this.setState({ page: n }, () => {
            this.getData();
            window.scrollTo(0, 0);
        });
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
                        return <ObjectComponent {...data} key={data._id} />;
                    })}
                </div>
                <div id="pagination">
                    <Pagination
                        activePage={this.state.page}
                        // totalPages={this.totalPages()}
                        totalPages={5} // TODO
                        onPageChange={this.setPage}
                    />
                </div>
            </div>
        );
    }
}

export default List;
