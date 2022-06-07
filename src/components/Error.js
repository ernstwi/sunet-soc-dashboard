import React from "react";
import PropTypes from "prop-types";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";

function Error(props) {
    return (
        <div id="error-container">
            <Alert severity="error">
                <AlertTitle>Internal server error</AlertTitle>
                <p>{props.error}</p>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        props.clearToken();
                        props.clearError();
                    }}
                >
                    Sign out
                </Button>
            </Alert>
        </div>
    );
}

Error.propTypes = {
    clearError: PropTypes.func.isRequired,
    clearToken: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
};

export default Error;
