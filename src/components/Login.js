import React, { useState } from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

function Login(props) {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loginFailed, setLoginFailed] = useState(false);

    // NOTE: btoa() limits email, password to ASCII
    function login(email, password) {
        fetch(window.injectedEnv.JWT_URL, {
            method: "POST",
            headers: { Authorization: "Basic " + btoa(email + ":" + password) }
        })
            .then(resp => {
                if (resp.status === 401) {
                    // TODO: CORS fails on requests with bad credentials, so
                    // this path is never taken. Fix this in auth-server-poc.

                    // Unauthorized: Wrong email/password
                    setLoginFailed(true);
                    return;
                }
                if (resp.status !== 200)
                    throw new Error(
                        `Unexpected HTTP response code from JWT server: ${resp.status} ${resp.statusText}`
                    );
                return resp;
            })
            .then(resp => resp.json())
            .then(data => {
                props.setToken(data.access_token);
            });
    }

    return (
        <div id="login-container">
            <Paper id="login" variant="outlined" color="green">
                <TextField
                    type="text"
                    name="email"
                    placeholder="Username..."
                    onChange={event => {
                        setEmail(event.target.value);
                    }}
                    onKeyDown={event => {
                        if (event.key === "Enter") login(email, password);
                    }}
                />
                <TextField
                    type="password"
                    placeholder="Password..."
                    name="password"
                    onChange={event => {
                        setPassword(event.target.value);
                    }}
                    onKeyDown={event => {
                        if (event.key === "Enter") login(email, password);
                    }}
                    sx={{
                        marginTop: "1em"
                    }}
                />
                <Button
                    variant="contained"
                    className="submit"
                    onClick={_ => {
                        login(email, password);
                    }}
                    sx={{
                        marginTop: "1em"
                    }}
                >
                    Sign in
                </Button>
                {loginFailed && (
                    <p className="error">Wrong username or password</p>
                )}
            </Paper>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
};

export default Login;
