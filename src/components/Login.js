import React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

class Login extends React.Component {
    static propTypes = {
        setToken: PropTypes.func.isRequired,
        setError: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: false
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    // NOTE: btoa() limits email, password to ASCII
    login(email, password) {
        const url = process.env.JWT_URL + "/api/v1.0/auth";
        fetch(url, {
            method: "POST",
            headers: { Authorization: "Basic " + btoa(email + ":" + password) }
        })
            .then(resp => {
                if (resp.status !== 200) throw resp;
                return resp;
            })
            .then(resp => resp.json())
            .then(data => {
                this.props.setToken(data.access_token);
            })
            .catch(resp => {
                if (resp.status === 401) this.setState({ error: true });
                else
                    this.props.setError(
                        new Error(
                            `Unexpected response status: ${resp.status} ${resp.statusText}`
                        )
                    );
            });
    }

    logout() {
        localStorage.removeItem("token");
    }

    render() {
        return (
            <div id="login-container">
                <Paper id="login" variant="outlined" color="green">
                    <TextField
                        type="text"
                        required
                        name="email"
                        placeholder="Username..."
                        onChange={event => {
                            this.setState({
                                email: event.target.value
                            });
                        }}
                    />
                    <TextField
                        type="password"
                        placeholder="Password..."
                        name="password"
                        onChange={event => {
                            this.setState({
                                password: event.target.value
                            });
                        }}
                        required
                        sx={{
                            marginTop: "1em"
                        }}
                    />
                    <Button
                        variant="contained"
                        className="submit"
                        onClick={e => {
                            this.login(this.state.email, this.state.password);
                        }}
                        sx={{
                            marginTop: "1em"
                        }}
                    >
                        Sign in
                    </Button>
                    {this.state.error && (
                        <p className="error">Wrong username or password</p>
                    )}
                </Paper>
            </div>
        );
    }
}

export default Login;
