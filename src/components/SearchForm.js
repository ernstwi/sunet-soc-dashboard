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
            field: "port",
            value: ""
        };

        this.clearSearch = this.clearSearch.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    clearSearch(_) {
        this.setState({ value: "" });
        this.props.filter(null, null);
    }

    submitSearch() {
        // e.preventDefault();
        if (this.state.value === "") this.clearSearch();
        else this.props.filter(this.state.field, this.state.value);
    }

    render() {
        return (
            <>
                <TextField
                    size="small"
                    fullWidth
                    id="value"
                    value={this.state.value}
                    onChange={event => {
                        this.setState({
                            value: event.target.value
                        });
                    }}
                    onKeyDown={event => {
                        if (event.key === "Enter") this.submitSearch();
                        if (event.key === "Escape") this.clearSearch();
                    }}
                    placeholder="Search..."
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {this.state.searchValue !== "" && (
                                    <IconButton onClick={this.clearSearch}>
                                        <ClearIcon />
                                    </IconButton>
                                )}
                            </InputAdornment>
                        )
                    }}
                    sx={{ width: 400 }}
                />
                <Select
                    size="small"
                    id="field"
                    value={this.state.field}
                    onChange={event => {
                        this.setState({
                            field: event.target.value
                        });
                    }}
                    sx={{ width: 200, marginLeft: "1em" }}
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
                    onClick={this.submitSearch}
                    sx={{ marginLeft: "1em" }}
                >
                    Search
                </Button>
            </>
        );
    }
}

export default SearchForm;
