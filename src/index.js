import React from "react";
import { render } from "react-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import App from "./components/App";

let global = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            }
        },
        MuiSvgIcon: {
            variants: [
                {
                    props: { variant: "clickable" },
                    style: {
                        cursor: "pointer"
                    }
                }
            ]
        }
    }
});

render(
    <ThemeProvider theme={global}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);
