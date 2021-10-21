import React from "react";

import Pagination from "@mui/material/Pagination";

import ObjectComponent from "./ObjectComponent";
import SearchForm from "./SearchForm";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            filter: {
                field: null,
                value: null
            },
            page: 1,
            totalPages: 1
        };

        this.filter = this.filter.bind(this);
        this.filterString = this.filterString.bind(this);
        this.getData = this.getData.bind(this);
        this.queryString = this.queryString.bind(this);
        this.setPage = this.setPage.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    //
    // Helpers
    //

    filterString() {
        return this.state.filter.field == null ||
            this.state.filter.value == null
            ? null
            : this.state.filter.field + "=" + this.state.filter.value;
    }

    queryString() {
        return [
            `limit=${process.env.PER_PAGE}`,
            `skip=${(this.state.page - 1) * process.env.PER_PAGE}`,
            this.filterString()
        ]
            .filter(x => x !== null)
            .join("&");
    }

    // Fetch data from external source, update state
    getData() {
        fetch(`${process.env.COLLECTOR_URL}/sc/v0/get?${this.queryString()}`, {
            headers: {
                Authorization: "Basic " + btoa("user1:pw1")
            }
        })
            // TODO: Look at `status` or return code or both?
            .then(resp => {
                if (resp.status !== 200)
                    throw `Unexpected HTTP response code from soc_collector: ${resp.status} ${resp.statusText}`;
                this.setState({
                    totalPages: parseInt(resp.headers.get("X-Total-Count"))
                });
                return resp.json();
            })
            .then(json => {
                if (json.status != "success")
                    throw `Unexpected status from soc_collector: ${json.status}`;
                this.setState({
                    objects: json.data
                });
            })
            .catch(e => this.props.setError(e));
    }

    //
    // Event handlers
    //

    filter(field, value) {
        this.setState(
            {
                filter: {
                    field: field,
                    value: value
                },
                page: 1
            },
            this.getData
        );
    }

    setPage(event, value) {
        this.setState({ page: value }, () => {
            console.log(this.state);
            this.getData();
            window.scrollTo(0, 0);
        });
    }

    render() {
        return (
            <div id="list-container">
                <div id="controls">
                    <div id="action"></div>
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
                        page={this.state.page}
                        count={this.state.totalPages}
                        onChange={this.setPage}
                        variant="outlined"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                    />
                </div>
            </div>
        );
    }
}

export default List;
