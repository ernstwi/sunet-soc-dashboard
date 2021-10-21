import React from "react";
import { render } from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./components/App";

render(
    <>
        <CssBaseline />
        <App />
    </>,
    document.getElementById("root")
);
