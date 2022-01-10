import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

class Header extends React.Component {
    static propTypes = {
        clearToken: PropTypes.func.isRequired
    };

    render() {
        return (
            <div id="header">
                <div id="title">
                    <Link to="/">✨ SOC Dashboard</Link>
                </div>
                <div id="right">
                    <Button
                        variant="contained"
                        color="error"
                        onClick={this.props.clearToken}
                    >
                        Sign out
                    </Button>
                </div>
            </div>
        );
    }
}

export default Header;
