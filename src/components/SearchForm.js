import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

class SearchForm extends React.Component {
    static propTypes = {
        filter: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        // NOTE: This state is for UI only, List state's "filter" is used for requests.
        this.state = {
            searchField: "port",
            searchValue: ""
        };

        this.clearSearch = this.clearSearch.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    clearSearch(_) {
        this.setState({ searchValue: "" });
        this.props.filter(null, null);
    }

    submitSearch() {
        // e.preventDefault();
        if (this.state.searchValue === "") this.clearSearch();
        else this.props.filter(this.state.searchField, this.state.searchValue);
    }

    render() {
        return (
            <>
                <TextField
                    fullWidth
                    size="small"
                    sx={{ width: 400 }}
                    value={this.state.searchValue}
                    placeholder="Search..."
                    onChange={event => {
                        this.setState({
                            searchValue: event.target.value
                        });
                    }}
                    onKeyDown={event => {
                        if (event.key === "Enter") this.submitSearch();
                        if (event.key === "Escape") this.clearSearch();
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {this.state.searchValue !== "" && (
                                    <ClearIcon
                                        variant="clickable"
                                        onClick={this.clearSearch}
                                    />
                                )}
                            </InputAdornment>
                        )
                    }}
                />
                <Select
                    size="small"
                    sx={{ width: 200, marginLeft: "1em" }}
                    value={this.state.searchField}
                    onChange={event => {
                        this.setState({
                            searchField: event.target.value
                        });
                    }}
                >
                    <MenuItem value="port">Port</MenuItem>
                    <MenuItem value="domain">Domain</MenuItem>
                    <MenuItem value="ip">IP</MenuItem>
                    <MenuItem value="asn">ASN</MenuItem>
                    <MenuItem value="asn_country_code">
                        ASN Country Code
                    </MenuItem>
                </Select>
                <Button
                    variant="contained"
                    sx={{ marginLeft: "1em" }}
                    onClick={this.submitSearch}
                >
                    Search
                </Button>
            </>
        );
    }
}

export default SearchForm;
