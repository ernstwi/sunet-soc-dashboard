import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Header(props) {
    return (
        <div id="header">
            <div id="title">
                <Link to="/">✨ SOC Dashboard</Link>
            </div>
            <div id="navigation">
                <Link to="/" className="active">
                    Example Navigation
                </Link>
                <span id="separator">•</span>
                <Link to="/">Example Navigation</Link>
                <span id="separator">•</span>
                <Link to="/">Example Navigation</Link>
            </div>
            <div id="right">
                <Button
                    variant="contained"
                    color="error"
                    onClick={props.clearToken}
                >
                    Sign out
                </Button>
            </div>
        </div>
    );
}

Header.propTypes = {
    clearToken: PropTypes.func.isRequired
};

export default Header;
