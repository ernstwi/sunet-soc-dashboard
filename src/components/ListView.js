import React from "react";

import Pagination from "@mui/material/Pagination";

import ListItem from "./ListItem";
import SearchForm from "./SearchForm";

class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scans: [],
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
            `limit=${window.injectedEnv.PER_PAGE}`,
            `skip=${(this.state.page - 1) * window.injectedEnv.PER_PAGE}`,
            this.filterString()
        ]
            .filter(x => x !== null)
            .join("&");
    }

    // Fetch data from external source, update state
    getData() {
        fetch(
            window.injectedEnv.COLLECTOR_URL +
                "/sc/v0/get?" +
                this.queryString(),
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
                this.setState({
                    totalPages: parseInt(resp.headers.get("X-Total-Count"))
                });
                return resp.json();
            })
            .then(json => {
                if (json.status != "success")
                    throw new Error(
                        `Unexpected status from soc_collector: ${json.status}`
                    );
                this.setState({
                    scans: json.docs
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
                <table id="main">
                    <tbody>
                        {this.state.scans
                            .sort((a, b) =>
                                Date.parse(
                                    a.timestamp_in_utc.replace(" UTC", "") >
                                        Date.parse(
                                            b.timestamp_in_utc.replace(
                                                " UTC",
                                                ""
                                            )
                                        )
                                )
                                    ? 1
                                    : -1
                            )
                            .map(scan =>
                                Object.entries(scan.result)
                                    .filter(([_, res]) => res.vulnerable)
                                    .map(([id, res]) => (
                                        <ListItem
                                            summary={true}
                                            {...scan}
                                            {...res}
                                            key={scan._id + id}
                                        />
                                    ))
                            )
                            .flat()}
                    </tbody>
                </table>
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

export default ListView;