import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

function SearchForm(props) {
    // NOTE: This state is for UI only, ListView's "filter" is used for requests.
    let [searchField, setSearchField] = useState("port");
    let [searchValue, setSearchValue] = useState("");

    useEffect(clearSearch, [searchField]);

    function clearSearch(_) {
        setSearchValue("");
        props.filter(null, null);
    }

    function submitSearch() {
        // e.preventDefault();
        if (searchValue === "") clearSearch();
        else props.filter(searchField, searchValue);
    }

    return (
        <div id="search">
            <TextField
                fullWidth
                size="small"
                sx={{ width: 400 }}
                value={searchValue}
                placeholder="Search..."
                onChange={event => {
                    setSearchValue(event.target.value);
                }}
                onKeyDown={event => {
                    if (event.key === "Enter") submitSearch();
                    if (event.key === "Escape") clearSearch();
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchValue !== "" && (
                                <ClearIcon
                                    variant="clickable"
                                    onClick={clearSearch}
                                />
                            )}
                        </InputAdornment>
                    )
                }}
            />
            <Select
                size="small"
                sx={{ width: 200, marginLeft: "1em" }}
                value={searchField}
                onChange={event => {
                    setSearchField(event.target.value);
                }}
            >
                <MenuItem value="port">Port</MenuItem>
                <MenuItem value="domain">Domain</MenuItem>
                <MenuItem value="ip">IP</MenuItem>
                <MenuItem value="asn">ASN</MenuItem>
                <MenuItem value="asn_country_code">ASN Country Code</MenuItem>
            </Select>
            <Button
                variant="contained"
                sx={{ marginLeft: "1em" }}
                onClick={submitSearch}
            >
                Search
            </Button>
        </div>
    );
}

SearchForm.propTypes = {
    filter: PropTypes.func.isRequired
};

export default SearchForm;
