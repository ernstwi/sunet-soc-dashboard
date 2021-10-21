import React from "react";
import PropTypes from "prop-types";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";

class Error extends React.Component {
    static propTypes = {
        clearError: PropTypes.func.isRequired,
        clearToken: PropTypes.func.isRequired,
        error: PropTypes.string.isRequired
    };

    render() {
        return (
            <div id="error-container">
                <Alert severity="error">
                    <AlertTitle>Internal server error</AlertTitle>
                    <p>{this.props.error}</p>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            this.props.clearToken();
                            this.props.clearError();
                        }}
                    >
                        Sign out
                    </Button>
                </Alert>
            </div>
        );
    }
}

export default Error;
