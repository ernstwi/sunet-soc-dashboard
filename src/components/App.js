import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

import Error from "./Error";
import Header from "./Header";
import List from "./List";
import Login from "./Login";
import ObjectView from "./ObjectView";

import "../styles/main.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem("token"),
            error: null
        };

        this.clearError = this.clearError.bind(this);
        this.clearToken = this.clearToken.bind(this);
        this.setError = this.setError.bind(this);
        this.setToken = this.setToken.bind(this);
    }

    setToken(token) {
        this.setState({ token: token });
        localStorage.setItem("token", token);
    }

    clearToken() {
        this.setState({ token: null });
        localStorage.removeItem("token");
    }

    setError(e) {
        this.setState({ error: e.message });
    }

    clearError() {
        this.setState({ error: null });
    }

    render() {
        if (this.state.error !== null)
            return (
                <Error
                    error={this.state.error}
                    clearError={this.clearError}
                    clearToken={this.clearToken}
                />
            );
        if (this.state.token === null)
            return <Login setToken={this.setToken} setError={this.setError} />;
        return (
            <Router>
                <Header clearToken={this.clearToken} />
                <Switch>
                    <Route path="/:id">
                        <MakeObjectView setError={this.setError} />
                    </Route>
                    <Route path="/">
                        <List setError={this.setError} />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

function MakeObjectView(props) {
    let { id } = useParams();
    return <ObjectView id={id} setError={props.setError} />;
}

export default App;
