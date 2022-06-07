import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

import Error from "./Error";
import Header from "./Header";
import ListView from "./ListView";
import Login from "./Login";
import ScanView from "./ScanView";

import "../styles/main.css";

function App(props) {
    let [token, setToken] = useState(localStorage.getItem("token"));
    let [error, setError] = useState(null);

    function setTokenWrapper(token) {
        localStorage.setItem("token", token);
        setToken(token);
    }

    function clearToken() {
        localStorage.removeItem("token");
        setToken(null);
    }

    function clearError() {
        setError(null);
    }

    if (error !== null)
        return (
            <Error
                error={error}
                clearError={clearError}
                clearToken={clearToken}
            />
        );

    if (token === null)
        return <Login setToken={setTokenWrapper} setError={setError} />;

    return (
        <Router>
            <Header clearToken={clearToken} />
            <Switch>
                <Route path="/:id">
                    <MakeScanView token={token} setError={setError} />
                </Route>
                <Route path="/">
                    <ListView token={token} setError={setError} />
                </Route>
            </Switch>
        </Router>
    );
}

function MakeScanView(props) {
    let { id } = useParams();
    return <ScanView id={id} token={props.token} setError={props.setError} />;
}

export default App;
